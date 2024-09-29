import { Exam, ExamSession, UserAnswer, ExamResult } from "@/lib/exam";
import { create } from "zustand";

interface ExamStore {
  currentExam: ExamSession | null;
  startExam: (exam: Exam) => void;
  submitAnswer: (questionId: string, selectedOptionIndex: number) => void;
  finishExam: () => ExamResult;
  getRemainingTime: () => number;
  showResults: boolean;
  setShowResults: (show: boolean) => void;
}

export const useExamStore = create<ExamStore>((set, get) => ({
  currentExam: null,
  showResults: false,
  startExam: (exam: Exam) => {
    const session: ExamSession = {
      exam,
      startTime: new Date(),
      answers: [],
      isCompleted: false,
    };
    set({ currentExam: session, showResults: false });
  },
  submitAnswer: (questionId: string, selectedOptionIndex: number) => {
    set((state) => {
      if (state.currentExam) {
        const existingAnswerIndex = state.currentExam.answers.findIndex(
          (answer) => answer.questionId === questionId
        );
        const newAnswer: UserAnswer = { questionId, selectedOptionIndex };

        let updatedAnswers: UserAnswer[];
        if (existingAnswerIndex !== -1) {
          updatedAnswers = [...state.currentExam.answers];
          updatedAnswers[existingAnswerIndex] = newAnswer;
        } else {
          updatedAnswers = [...state.currentExam.answers, newAnswer];
        }

        return {
          currentExam: {
            ...state.currentExam,
            answers: updatedAnswers,
          },
        };
      }
      return state;
    });
  },
  finishExam: () => {
    const { currentExam } = get();
    if (currentExam) {
      const { exam, answers, startTime } = currentExam;
      const correctAnswers = answers.filter((answer) => {
        const question = exam.questions.find((q) => q.id === answer.questionId);
        return (
          question && answer.selectedOptionIndex === question.correctOptionIndex
        );
      }).length;
      const result: ExamResult = {
        score: (correctAnswers / exam.questions.length) * 100,
        totalQuestions: exam.questions.length,
        correctAnswers,
        timeTaken: (new Date().getTime() - startTime.getTime()) / 60000, // in minutes
      };
      set((state) => ({
        currentExam: state.currentExam
          ? {
              ...state.currentExam,
              isCompleted: true,
              result,
            }
          : null,
        showResults: true,
      }));
      return result;
    }
    throw new Error("No active exam session");
  },
  getRemainingTime: () => {
    const { currentExam } = get();
    if (currentExam) {
      const { startTime, exam } = currentExam;
      const elapsedTime = (new Date().getTime() - startTime.getTime()) / 1000;
      return Math.max(0, exam.timeLimit * 60 - elapsedTime);
    }
    return 0;
  },
  setShowResults: (show: boolean) => set({ showResults: show }),
}));
