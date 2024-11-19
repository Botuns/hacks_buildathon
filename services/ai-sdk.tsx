"use server";

// Load environment variables first
import "dotenv/config";
import { generateObject } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { z } from "zod";
import { DifficultyLevel, Exam } from "@/lib/exam";
import { generateExamPrompt } from "@/app/helpers/learn_generator_prompt";
import { ExamSchema } from "./exam-schema";

// Check for API key
const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
  throw new Error("OPENAI_API_KEY is not configured in environment variables");
}

const openai = createOpenAI({
  apiKey,
  compatibility: "strict",
});

const MODEL_NAME = "gpt-4o-mini";

export async function GenerateCourseOutput(prompt: string) {
  try {
    const response = await generateObject({
      model: openai(MODEL_NAME),
      schema: courseSchema,
      prompt: prompt,
    });
    return response.object as CourseContent;
  } catch (error) {
    console.error("Error generating course output:", error);
    throw error;
  }
}

export type CourseContent = {
  title: string;
  contents: string[];
  numberOfSections: number;
};

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
      model: openai(MODEL_NAME),
      schema: ExamSchema,
      prompt: _prompt,
      system: systemPrompt,
    });
    return response.object as Exam;
  } catch (error: any) {
    console.error("Error generating exam questions:", error);
    throw error;
  }
}
