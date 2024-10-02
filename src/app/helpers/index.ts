import { DifficultyLevel, Exam } from "@/lib/exam";
import { OpenAi } from "../../../services/gpt";
import { generateExamPrompt } from "./learn_generator_prompt";

export async function generateExam(
    difficulty: DifficultyLevel,
    className: string,
    description: string,
    numberOfQuestions: number
  ): Promise<Exam> {
    const prompt = generateExamPrompt(difficulty, className, description, numberOfQuestions);
    const systemPrompt = "You are an AI assistant specialized in creating structured exam content.";
  
    const generatedContent = await OpenAi(prompt, systemPrompt);
  
    try {
      const exam: Exam = JSON.parse(generatedContent);
      return exam;
    } catch (error) {
      console.error("Error parsing generated content:", error);
      throw new Error("Failed to generate a valid exam structure");
    }
  }