import { useExamStore } from "@/app/hooks/providers/examStore";
import { Question as QuestionType } from "@/lib/exam";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface QuestionProps {
  question: QuestionType;
}

export function Question({ question }: QuestionProps) {
  const { submitAnswer, currentExam } = useExamStore();

  const handleOptionSelect = (optionIndex: number) => {
    submitAnswer(question.id, optionIndex);
  };

  const selectedOptionIndex = currentExam?.answers.find(
    (answer) => answer.questionId === question.id
  )?.selectedOptionIndex;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">
        {question.text}
      </h2>
      <RadioGroup
        value={selectedOptionIndex?.toString()}
        onValueChange={(value) => handleOptionSelect(parseInt(value))}
        className="space-y-3"
      >
        {question.options.map((option, index) => {
          const letter = String.fromCharCode(65 + index);
          return (
            <div
              key={index}
              className={cn(
                "flex items-center space-x-3 p-4 rounded-lg border transition-colors",
                selectedOptionIndex === index
                  ? "bg-blue-50 border-blue-200"
                  : "border-gray-200 hover:bg-gray-50"
              )}
            >
              <RadioGroupItem
                value={index.toString()}
                id={`option-${index}`}
                className="border-gray-300"
              />
              <Label
                htmlFor={`option-${index}`}
                className="flex-1 cursor-pointer"
              >
                <span className="font-medium text-gray-500 mr-2">
                  {letter}.
                </span>
                <span className="text-gray-700">{option}</span>
              </Label>
            </div>
          );
        })}
      </RadioGroup>
    </div>
  );
}
