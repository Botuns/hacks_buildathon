import { Button } from "@/components/ui/button";
import { Brain, Sparkles } from "lucide-react";
import { Wand2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { BookOpen, BarChart, Hash } from "lucide-react";

interface GenerateButtonProps {
  onClick: () => void;
}

export function GenerateButton({ onClick }: GenerateButtonProps) {
  return (
    <Button
      onClick={onClick}
      className="w-full mt-8 text-lg py-6 bg-gradient-to-r from-primary to-indigo-600 hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105"
    >
      <Wand2 className="w-6 h-6 mr-2" />
      Generate Exam
    </Button>
  );
}

// input

interface AIPromptInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function AIPromptInput({ value, onChange }: AIPromptInputProps) {
  return (
    <div className="space-y-4 mt-8">
      <div className="flex items-center space-x-2">
        <MessageSquare className="w-6 h-6 text-primary" />
        <label htmlFor="ai-prompt" className="font-medium">
          Describe your exam requirements
        </label>
      </div>
      <Textarea
        id="ai-prompt"
        placeholder="E.g., Create an exam focusing on World War II, including questions about key events, figures, and impacts."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="min-h-[100px]"
      />
    </div>
  );
}

// form

interface ExamFormProps {
  formData: {
    difficulty: string;
    class: string;
    questionCount: number;
  };
  onChange: (key: string, value: string | number) => void;
}

export function ExamForm({ formData, onChange }: ExamFormProps) {
  return (
    <div className="space-y-6">
      <DifficultySelector
        value={formData.difficulty}
        onChange={(value) => onChange("difficulty", value)}
      />
      <ClassSelector
        value={formData.class}
        onChange={(value) => onChange("class", value)}
      />
      <QuestionCountSelector
        value={formData.questionCount}
        onChange={(value) => onChange("questionCount", value)}
      />
    </div>
  );
}

function DifficultySelector({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="flex items-center space-x-4">
      <BarChart className="w-6 h-6 text-primary" />
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select difficulty" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="easy">Easy</SelectItem>
          <SelectItem value="medium">Medium</SelectItem>
          <SelectItem value="hard">Hard</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

function ClassSelector({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="flex items-center space-x-4">
      <BookOpen className="w-6 h-6 text-primary" />
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select class" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="math">Mathematics</SelectItem>
          <SelectItem value="science">Science</SelectItem>
          <SelectItem value="history">History</SelectItem>
          <SelectItem value="literature">Literature</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

function QuestionCountSelector({
  value,
  onChange,
}: {
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <Hash className="w-6 h-6 text-primary" />
        <span className="font-medium">Number of Questions: {value}</span>
      </div>
      <Slider
        value={[value]}
        onValueChange={(newValue) => onChange(newValue[0])}
        max={40}
        min={10}
        step={10}
        className="w-full"
      />
    </div>
  );
}

export function Header() {
  return (
    <div className="bg-gradient-to-r from-primary to-indigo-600 p-6 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <Brain className="w-10 h-10 text-white" />
        <h1 className="text-3xl font-bold text-white">AI Exam Generator</h1>
      </div>
      <Sparkles className="w-8 h-8 text-yellow-300 animate-pulse" />
    </div>
  );
}
