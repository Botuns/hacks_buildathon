import { z } from "zod";

// Zod schema for DifficultyLevel enum
const DifficultyLevelEnum = z.enum(["Easy", "Medium", "Hard"]);

// Zod schema for a single question
const QuestionSchema = z.object({
  id: z.string(),
  text: z.string(),
  options: z.array(z.string()),
  correctOptionIndex: z.number().int().nonnegative(),
});

// Zod schema for an exam
const ExamSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  questions: z.array(QuestionSchema),
  timeLimit: z.number().int().positive(), // in minutes
  difficultyLevel: DifficultyLevelEnum,
});

// Zod schema for a user's answer to a single question
const UserAnswerSchema = z.object({
  questionId: z.string(),
  selectedOptionIndex: z.number().int().nonnegative(),
});

// Zod schema for the exam result
const ExamResultSchema = z.object({
  score: z.number().min(0).max(100),
  totalQuestions: z.number().int().positive(),
  correctAnswers: z.number().int().nonnegative(),
  timeTaken: z.number().positive(), // in minutes
});

// Zod schema for the current exam session
const ExamSessionSchema = z.object({
  exam: ExamSchema,
  startTime: z.date(),
  answers: z.array(UserAnswerSchema),
  isCompleted: z.boolean(),
  result: ExamResultSchema.optional(),
});

// Zod schema for the OnlineExamSystem type
const OnlineExamSystemSchema = z.object({
  currentExam: ExamSessionSchema.nullable(),
  startExam: z.function().args(ExamSchema).returns(ExamSessionSchema),
  submitAnswer: z
    .function()
    .args(z.string(), z.number().int().nonnegative())
    .returns(z.void()),
  finishExam: z.function().returns(ExamResultSchema),
  getRemainingTime: z.function().returns(z.number().nonnegative()),
});

export {
  DifficultyLevelEnum,
  QuestionSchema,
  ExamSchema,
  UserAnswerSchema,
  ExamResultSchema,
  ExamSessionSchema,
  OnlineExamSystemSchema,
};
