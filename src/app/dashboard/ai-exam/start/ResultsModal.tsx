import { useExamStore } from "@/app/hooks/providers/examStore";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trophy, Frown, Clock, Target, Award } from "lucide-react";

const getRandomEncouragement = (passed: boolean) => {
  const passMessages = [
    "Excellent work! You're a star!",
    "Fantastic job! Keep up the great work!",
    "You've nailed it! Bravo!",
    "Outstanding performance! You should be proud!",
    "Superb effort! You're on fire!",
  ];
  const failMessages = [
    "Don't give up! You're learning and improving!",
    "Keep your chin up! Every attempt is a step forward.",
    "You've got this! Time to bounce back stronger!",
    "Believe in yourself! Your next attempt will be better!",
    "Stay positive! Learning is a journey, not a destination.",
  ];
  const messages = passed ? passMessages : failMessages;
  return messages[Math.floor(Math.random() * messages.length)];
};

export function ResultsModal() {
  const { currentExam, showResults, setShowResults } = useExamStore();

  if (!currentExam || !currentExam.result) {
    return null;
  }

  const { score, totalQuestions, correctAnswers, timeTaken } =
    currentExam.result;
  const passed = score >= 60;

  const encouragement = getRandomEncouragement(passed);

  return (
    <Dialog open={showResults} onOpenChange={setShowResults}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Exam Results
          </DialogTitle>
          <DialogDescription className="text-center">
            Here&apos;s how you performed on the exam:
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-6">
          <div className="flex justify-center">
            {passed ? (
              <Trophy className="w-24 h-24 text-yellow-500" />
            ) : (
              <Frown className="w-24 h-24 text-blue-500" />
            )}
          </div>
          <div className="text-center space-y-2">
            <p className="text-3xl font-bold">{score.toFixed(2)}%</p>
            <p className="text-xl font-semibold">
              {passed
                ? "Congratulations! You passed!"
                : "Keep practicing! You'll get there!"}
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Target className="w-6 h-6 text-green-500" />
              <p>
                Correct Answers: {correctAnswers} out of {totalQuestions}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-6 h-6 text-purple-500" />
              <p>Time Taken: {timeTaken.toFixed(2)} minutes</p>
            </div>
          </div>
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <div className="flex items-center space-x-2">
              <Award className="w-6 h-6 text-indigo-500" />
              <p className="font-medium italic">{encouragement}</p>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={() => setShowResults(false)} className="w-full">
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
