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
import {
  Trophy,
  Frown,
  Clock,
  Target,
  Award,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

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

  const missedQuestions = currentExam.exam.questions.filter(
    (question, index) =>
      currentExam.answers[index]?.selectedOptionIndex !==
      question.correctOptionIndex
  );

  const accuracy = (correctAnswers / totalQuestions) * 100;
  const averageTimePerQuestion = timeTaken / totalQuestions;

  return (
    <Dialog open={showResults} onOpenChange={setShowResults}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-hidden ">
        <ScrollArea className="max-h-[80vh]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center">
              Exam Results
            </DialogTitle>
            <DialogDescription className="text-center">
              Here&apos;s how you performed on the exam:
            </DialogDescription>
          </DialogHeader>
          <Tabs defaultValue="summary" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="summary">Summary</TabsTrigger>
              <TabsTrigger value="missed">Missed Questions</TabsTrigger>
              <TabsTrigger value="stats">Statistics</TabsTrigger>
            </TabsList>
            <TabsContent value="summary">
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
            </TabsContent>
            <TabsContent value="missed">
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Missed Questions:</h3>
                {missedQuestions.map((question, index) => (
                  <div key={question.id} className="border-b pb-2">
                    <p className="font-medium">
                      {index + 1}. {question.text}
                    </p>
                    <p className="text-red-500 flex items-center">
                      <XCircle className="w-4 h-4 mr-2" />
                      Your answer:{" "}
                      {
                        question.options[
                          currentExam.answers.find(
                            (a) => a.questionId === question.id
                          )?.selectedOptionIndex || 0
                        ]
                      }
                    </p>
                    <p className="text-green-500 flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Correct answer:{" "}
                      {question.options[question.correctOptionIndex]}
                    </p>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="stats">
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Statistical Summary:</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                    <p className="font-medium">Accuracy</p>
                    <p className="text-2xl font-bold">{accuracy.toFixed(2)}%</p>
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                    <p className="font-medium">Average Time per Question</p>
                    <p className="text-2xl font-bold">
                      {averageTimePerQuestion.toFixed(2)} minutes
                    </p>
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                    <p className="font-medium">Total Questions</p>
                    <p className="text-2xl font-bold">{totalQuestions}</p>
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                    <p className="font-medium">Correct Answers</p>
                    <p className="text-2xl font-bold">{correctAnswers}</p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
          <DialogFooter>
            <Button onClick={() => setShowResults(false)} className="w-full">
              Close
            </Button>
          </DialogFooter>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
