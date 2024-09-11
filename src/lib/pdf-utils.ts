// @/lib/pdf-utils.ts

import pdfToText from "react-pdftotext";
import { OpenAiGptChat } from "../../services/gpt";

/**
 * Extracts text content from a PDF file
 * @param file The PDF file to process
 * @returns A promise that resolves to the extracted text content
 */
export async function extractTextFromPDF(file: File): Promise<string> {
  try {
    const text = await pdfToText(file);
    console.log(file, text);
    if (!text) {
      throw new Error("No text extracted from the PDF");
    }
    return text;
  } catch (error) {
    console.error("Error extracting text from PDF:", error);
    throw new Error("Failed to extract text from PDF");
  }
}

/**
 * Chunks the PDF text into smaller segments for efficient processing
 * @param text The full text content of the PDF
 * @param chunkSize The maximum size of each chunk
 * @returns An array of text chunks
 */
export function chunkText(text: string, chunkSize: number = 2000): string[] {
  const chunks: string[] = [];
  let index = 0;

  while (index < text.length) {
    let end = text.lastIndexOf(".", index + chunkSize);
    if (end === -1 || end < index) {
      end = index + chunkSize;
    } else {
      end += 1;
    }

    chunks.push(text.slice(index, end).trim());
    index = end;
  }

  return chunks;
}

/**
 * Sends a question about the PDF content to the OpenAI GPT model and returns the response
 * @param pdfText The text content of the PDF
 * @param question The user's question about the PDF
 * @returns A promise that resolves to the GPT model's response
 */
export async function chatWithPDF(
  pdfText: string,
  question: string
): Promise<string> {
  const chunks = chunkText(pdfText);
  const systemPrompt =
    "You are a helpful assistant that answers questions based on the provided PDF content. Always strive to give accurate and relevant information from the PDF.";

  let context = "";
  let response = "";

  for (const chunk of chunks) {
    const prompt = `PDF Content: ${chunk}\n\nQuestion: ${question}\n\nIf the answer to the question is in this chunk of text, please provide it. If not, simply respond with "No relevant information found in this chunk."`;

    const chunkResponse = await OpenAiGptChat(prompt, systemPrompt);

    if (
      chunkResponse &&
      !chunkResponse.includes("No relevant information found")
    ) {
      context += chunk + " ";
      response += chunkResponse + " ";
    }

    if (context.length > 3000) break; // Limit context to avoid exceeding token limits
  }

  if (!response) {
    return "I couldn't find relevant information to answer your question based on the PDF content.";
  }

  const finalPrompt = `Based on the following context from the PDF:\n\n${context}\n\nPlease provide a concise and accurate answer to the question: ${question}`;
  return OpenAiGptChat(finalPrompt, systemPrompt);
}

/**
 * Generates questions based on the PDF content with improved formatting
 * @param pdfText The text content of the PDF
 * @param count The number of questions to generate
 * @param difficulty The difficulty level of the questions
 * @returns A promise that resolves to the generated questions in MDX format
 */
export async function generateQuestions(
  pdfText: string,
  count: number,
  difficulty: string
): Promise<string> {
  const chunks = chunkText(pdfText);
  const systemPrompt = `You are an expert at creating insightful questions based on given text. Generate ${count} ${difficulty}-level questions that encourage critical thinking and deep understanding of the content. For each question, also provide a brief explanation or context, and suggest potential areas for further exploration.`;

  let questions: string = "";

  for (const chunk of chunks) {
    const prompt = `Based on the following text, generate ${Math.min(
      count - questions.split("##").length + 1,
      3
    )} ${difficulty}-level questions:\n\n${chunk}\n\nFormat each question as follows:
## Question [number]

[Question text]

**Explanation:** [Brief explanation or context for the question]

**Further Exploration:** [Suggestion for related topics or deeper analysis]

---
`;

    const response = await OpenAiGptChat(prompt, systemPrompt);
    questions += response + "\n\n";

    if (questions.split("##").length - 1 >= count) break;
  }

  // Ensure we have the correct number of questions
  const formattedQuestions = questions
    .split("##")
    .slice(1, count + 1)
    .map((q, index) => `## Question ${index + 1}${q}`)
    .join("\n\n");

  return `# Questions Generated from PDF Content\n\n${formattedQuestions}`;
}
