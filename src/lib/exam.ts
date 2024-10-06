// Difficulty level enum
export enum DifficultyLevel {
  Easy = "Easy",
  Medium = "Medium",
  Hard = "Hard",
}

// Interface for a single question
export interface Question {
  id: string;
  text: string;
  options: string[];
  correctOptionIndex: number;
}

// Interface for an exam
export interface Exam {
  id: string;
  title: string;
  description: string;
  questions: Question[];
  timeLimit: number; // in minutes
  difficultyLevel: DifficultyLevel;
}

// Interface for a user's answer to a single question
export interface UserAnswer {
  questionId: string;
  selectedOptionIndex: number;
}

// Interface for the exam result
export interface ExamResult {
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  timeTaken: number; // in minutes
}

// Interface for the current exam session
export interface ExamSession {
  exam: Exam;
  startTime: Date;
  answers: UserAnswer[];
  isCompleted: boolean;
  result?: ExamResult;
}

export type OnlineExamSystem = {
  currentExam: ExamSession | null;
  startExam: (exam: Exam) => ExamSession;
  submitAnswer: (questionId: string, selectedOptionIndex: number) => void;
  finishExam: () => ExamResult;
  getRemainingTime: () => number; // in seconds
};

// Sample exam questions
export const sampleExam: Exam = {
  id: "GK2024",
  title: "General Knowledge Quiz 2024",
  description: "Test your knowledge across various topics!",
  questions: [
    {
      id: "Q1",
      text: "What is the capital of France?",
      options: ["London", "Berlin", "Paris", "Madrid"],
      correctOptionIndex: 2,
    },
    {
      id: "Q2",
      text: "Which planet is known as the Red Planet?",
      options: ["Venus", "Mars", "Jupiter", "Saturn"],
      correctOptionIndex: 1,
    },
    {
      id: "Q3",
      text: "Who painted the Mona Lisa?",
      options: [
        "Vincent van Gogh",
        "Pablo Picasso",
        "Leonardo da Vinci",
        "Michelangelo",
      ],
      correctOptionIndex: 2,
    },
    {
      id: "Q4",
      text: "What is the chemical symbol for gold?",
      options: ["Go", "Gd", "Au", "Ag"],
      correctOptionIndex: 2,
    },
    {
      id: "Q5",
      text: "Which of these is not a programming language?",
      options: ["Python", "Java", "HTML", "Cobra"],
      correctOptionIndex: 3,
    },
    {
      id: "Q6",
      text: "What year did World War II end?",
      options: ["1943", "1944", "1945", "1946"],
      correctOptionIndex: 2,
    },
    {
      id: "Q7",
      text: "Who wrote '1984'?",
      options: ["George Orwell", "Aldous Huxley", "Ray Bradbury", "H.G. Wells"],
      correctOptionIndex: 0,
    },
    {
      id: "Q8",
      text: "What is the largest ocean on Earth?",
      options: [
        "Atlantic Ocean",
        "Indian Ocean",
        "Arctic Ocean",
        "Pacific Ocean",
      ],
      correctOptionIndex: 3,
    },
    {
      id: "Q9",
      text: "What is the square root of 144?",
      options: ["10", "11", "12", "13"],
      correctOptionIndex: 2,
    },
    {
      id: "Q10",
      text: "Which element has the chemical symbol 'O'?",
      options: ["Gold", "Silver", "Oxygen", "Osmium"],
      correctOptionIndex: 2,
    },
  ],
  timeLimit: 15, // 15 minutes
  difficultyLevel: DifficultyLevel.Medium,
};

// Example usage of the exam system
export const examSystem: OnlineExamSystem = {
  currentExam: null,
  startExam: (exam: Exam) => {
    const session: ExamSession = {
      exam,
      startTime: new Date(),
      answers: [],
      isCompleted: false,
    };
    examSystem.currentExam = session;
    return session;
  },
  submitAnswer: (questionId: string, selectedOptionIndex: number) => {
    if (examSystem.currentExam) {
      examSystem.currentExam.answers.push({ questionId, selectedOptionIndex });
    }
  },
  finishExam: () => {
    if (examSystem.currentExam) {
      const { exam, answers, startTime } = examSystem.currentExam;
      const correctAnswers = answers.filter(
        (answer, index) =>
          answer.selectedOptionIndex ===
          exam.questions[index].correctOptionIndex
      ).length;
      const result: ExamResult = {
        score: (correctAnswers / exam.questions.length) * 100,
        totalQuestions: exam.questions.length,
        correctAnswers,
        timeTaken: (new Date().getTime() - startTime.getTime()) / 60000, // in minutes
      };
      examSystem.currentExam.isCompleted = true;
      examSystem.currentExam.result = result;
      return result;
    }
    throw new Error("No active exam session");
  },
  getRemainingTime: () => {
    if (examSystem.currentExam) {
      const { startTime, exam } = examSystem.currentExam;
      const elapsedTime = (new Date().getTime() - startTime.getTime()) / 1000;
      return Math.max(0, exam.timeLimit * 60 - elapsedTime);
    }
    return 0;
  },
};
