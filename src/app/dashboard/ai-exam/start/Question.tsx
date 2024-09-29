import { useExamStore } from "@/app/hooks/providers/examStore";
import { Question as QuestionType } from "@/lib/exam";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

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
    <div>
      <h2 className="text-xl font-semibold mb-4">{question.text}</h2>
      <RadioGroup
        value={selectedOptionIndex?.toString()}
        onValueChange={(value) => handleOptionSelect(parseInt(value))}
      >
        {question.options.map((option, index) => (
          <div key={index} className="flex items-center space-x-2 mb-2">
            <RadioGroupItem value={index.toString()} id={`option-${index}`} />
            <Label htmlFor={`option-${index}`}>{option}</Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}
