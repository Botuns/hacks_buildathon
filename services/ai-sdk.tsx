// "use server";
import { generateObject } from "ai";
import dotenv from "dotenv";
import { createOpenAI } from "@ai-sdk/openai";
// import { openai } from "@ai-sdk/openai";
import { z } from "zod";
import "dotenv/config";
import { DifficultyLevel, Exam } from "@/lib/exam";
import { generateExamPrompt } from "@/app/helpers/learn_generator_prompt";
import { ExamSchema } from "./exam-schema";
dotenv.config();
const api_key = process.env.OPENAI_API_KEY;

const openai = createOpenAI({
  apiKey: api_key,
  compatibility: "strict",
});

export async function GenerateCourseOutput(prompt: string) {
  // console.log(api_key);
  const response = await generateObject({
    model: openai("gpt-4o-mini"),
    schema: courseSchema,
    prompt: prompt,
  });
  // console.log(response);
  return response.object as CourseContent;
}

export type CourseContent = {
  title: string;
  contents: string[];
  numberOfSections: number;
};

// zod type
const courseSchema = z.object({
  title: z.string().describe("The title of the course"),
  contents: z.array(
    z.string().describe("The contents of the course in a particular section")
  ),
  numberOfSections: z.number().describe("The number of sections in the course"),
});

export async function generateExamQuestions(
  difficulty: DifficultyLevel,
  className: string,
  description: string,
  numberOfQuestions: number
) {
  const systemPrompt =
    "You are an AI assistant specialized in creating structured exam content.";
  try {
    const _prompt = generateExamPrompt(
      difficulty,
      className,
      description,
      numberOfQuestions
    );
    const response = await generateObject({
      model: openai("gpt-4o-mini"),
      schema: ExamSchema,
      prompt: _prompt,
      system: systemPrompt,
    });
    console.log(response);
    return response.object as Exam;
  } catch (error: any) {
    console.log(error.message);
    return [];
  }
}
