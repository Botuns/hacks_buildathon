import { DifficultyLevel, Exam } from "@/lib/exam";
import { OpenAi } from "../../../services/gpt";
import {
  generateExamPrompt,
  generateSearchResultsPrompt,
} from "./learn_generator_prompt";
import { AiSearchResults } from "@/lib/search";

export async function generateExam(
  difficulty: DifficultyLevel,
  className: string,
  description: string,
  numberOfQuestions: number
): Promise<Exam> {
  const prompt = generateExamPrompt(
    difficulty,
    className,
    description,
    numberOfQuestions
  );
  const systemPrompt =
    "You are an AI assistant specialized in creating structured exam content.";

  const generatedContent = await OpenAi(prompt, systemPrompt);

  try {
    const exam: Exam = JSON.parse(generatedContent);
    return exam;
  } catch (error) {
    console.error("Error parsing generated content:", error);
    throw new Error("Failed to generate a valid exam structure");
  }
}

export async function generateSearchResults(
  query: string,
  numberOfResults: number = 4
): Promise<AiSearchResults> {
  const prompt = generateSearchResultsPrompt(query, numberOfResults);
  const systemPrompt =
    "You are an AI assistant specialized in performing web searches and providing structured search results.";

  try {
    const generatedContent = await OpenAi(prompt, systemPrompt);
    const searchResults: AiSearchResults = JSON.parse(generatedContent);

    if (
      !searchResults.overviewDescription ||
      !Array.isArray(searchResults.results) ||
      searchResults.results.length !== numberOfResults
    ) {
      throw new Error(
        "Generated content does not match the expected structure"
      );
    }

    searchResults.results.forEach((result) => {
      if (
        !result.imageUrl ||
        !result.descriptionAnswer ||
        typeof result.confidenceLevel !== "number" ||
        !result.externalLink
      ) {
        throw new Error(
          "One or more search results are missing required fields"
        );
      }
    });

    return searchResults;
  } catch (error) {
    console.error("Error generating or parsing search results:", error);
    throw new Error("Failed to generate valid search results");
  }
}
