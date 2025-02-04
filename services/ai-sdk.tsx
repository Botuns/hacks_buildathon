"use server";

// Load environment variables first
import "dotenv/config";
import fs from "fs/promises";
import { generateObject } from "ai";
// import { anthropic } from "@ai-sdk/anthropic";
import { createOpenAI } from "@ai-sdk/openai";
import { z } from "zod";
import { DifficultyLevel, Exam } from "@/lib/exam";
import { generateExamPrompt } from "@/app/helpers/learn_generator_prompt";
import { ExamSchema } from "./exam-schema";
// import { createAzure } from "@ai-sdk/azure";
import { createTogetherAI } from "@ai-sdk/togetherai";

const togetherai = createTogetherAI({
  apiKey: "82856e5a632e566e98fdc7e4644594b931743a2c7a8f2ef4db40e32d8ab4bdd6",
});

// const azure = createAzure({
//   resourceName: "your-resource-name", // Azure resource name
//   apiKey: "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",
// });

const token = "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";
const endpoint = "https://models.inference.ai.azure.com";
const modelName = "gpt-4o-mini";
// Check for API key
const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
  throw new Error("OPENAI_API_KEY is not configured in environment variables");
}

const openai = createOpenAI({
  apiKey,
  // baseURL: endpoint,
  compatibility: "strict",
});

const MODEL_NAME = "gpt-4o-mini";
// const MODEL_NAME = "gpt-4o";
// model: togetherai("deepseek-ai/DeepSeek-R1"),
// model: togetherai("deepseek-ai/DeepSeek-R1"),
// model: anthropic("claude-3-5-sonnet-20241022"),
// model: openai(modelName),

export async function GenerateCourseOutput(prompt: string) {
  try {
    const response = await generateObject({
      // model: togetherai("deepseek-ai/deepseek-llm-67b-chat"),
      model: openai(modelName),
      schema: courseSchema,
      prompt: prompt,
    });
    // console.log(response); --- write the response to a jsson file
    // const jsonData = JSON.stringify(response, null, 2);

    // Write the JSON data to a file
    // await fs.writeFile("response.json", jsonData);
    // console.log("Response has been written to response.json");

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
      // model: openai(MODEL_NAME),
      model: openai(modelName),
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
