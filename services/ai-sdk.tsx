import { generateObject } from "ai";
import dotenv from "dotenv";
import { createOpenAI } from "@ai-sdk/openai";
// import { openai } from "@ai-sdk/openai";
import { z } from "zod";
import "dotenv/config";
dotenv.config();
const api_key = process.env.OPENAI_API_KEY;

const openai = createOpenAI({
  apiKey:
    "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",
  // custom settings, e.g.
  compatibility: "strict", // strict mode, enable when using the OpenAI API
});

export async function GenerateCourseOutput(prompt: string) {
  console.log(api_key);
  const response = await generateObject({
    model: openai("gpt-4o-mini"),
    schema: courseSchema,
    prompt: prompt,
  });
  console.log(response);
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
