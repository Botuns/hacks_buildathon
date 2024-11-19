"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useExamStore } from "@/app/hooks/providers/examStore";
import { Timer } from "./Timer";
import { Question } from "./Question";
import { ResultsModal } from "./ResultsModal";
import { sampleExam } from "@/lib/exam";
import { ArrowLeft, Sparkles } from "lucide-react";

export default function ExamApp() {
  const { currentExam, startExam, finishExam, showResults } = useExamStore();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  useEffect(() => {
    if (!currentExam) {
      startExam(sampleExam);
    }
  }, [currentExam, startExam]);

  if (!currentExam) {
    return <div>Loading...</div>;
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < currentExam.exam.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleFinishExam = () => {
    finishExam();
  };

  return (
    <div className="min-h-screen bg-none">
      <div className="max-w-4xl mx-auto p-0 mt-0">
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={handlePreviousQuestion}
            disabled={currentQuestionIndex === 0}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="gap-2 bg-gradient-to-r from-blue-600 to-purple-400 text-transparent bg-clip-text rounded-full shadow-lg"
          >
            <Sparkles className="w-4 h-4 !text-blue-500" />
            Upgrade to Pro
          </Button>
        </div>

        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-semibold">
                {currentExam.exam.title}
              </h1>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Timer />
              </div>
            </div>
            <div className="space-y-1">
              <span className="text-sm text-muted-foreground">
                Question {currentQuestionIndex + 1}
              </span>
              <div className="text-sm text-muted-foreground">
                Difficulty: {currentExam.exam.difficultyLevel}
              </div>
              <p className="text-sm italic text-black font-bold">
                Description: {currentExam.exam.description}
              </p>
            </div>
          </div>

          <Question
            question={currentExam.exam.questions[currentQuestionIndex]}
          />

          <div className="flex justify-end gap-4">
            {currentQuestionIndex === currentExam.exam.questions.length - 1 ? (
              <Button
                onClick={handleFinishExam}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Finish Exam
              </Button>
            ) : (
              <Button
                onClick={handleNextQuestion}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Next
              </Button>
            )}
          </div>
        </div>
      </div>
      {showResults && <ResultsModal />}
    </div>
  );
}
