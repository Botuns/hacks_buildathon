"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  BookOpen,
  BarChart,
  Hash,
  MessageSquare,
} from "lucide-react";
import { generateExam } from "@/app/helpers";
import { DifficultyLevel } from "@/lib/exam";
import { toast } from "sonner";
import { useExamStore } from "@/app/hooks/providers/examStore";
import { Loader } from "rsuite";

export default function ExamGeneratorPage() {
  const router = useRouter();
  const { startExam } = useExamStore();
  const [formData, setFormData] = useState({
    difficulty: "",
    class: "",
    questionCount: 10,
    aiPrompt: "",
  });
  const [loading, setLoading] = useState(false);

  const handleFormChange = (key: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    // console.log("Generating exam with data:", formData);
    setLoading(true);
    try {
      const exam = await generateExam(
        formData.difficulty as DifficultyLevel,
        formData.class,
        formData.aiPrompt,
        formData.questionCount
      );
      if (!exam.title) {
        toast.error("Failed to generate exam");
        return;
      }
      // save exa to zustand store
      startExam(exam);
      toast.success("Exam generated successfully");
      router.push("ai-exam/start");
    } catch (error: any) {
      console.error("Failed to generate exam:", error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 ">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-3xl"
      >
        <Card className="rounded-lg">
          <CardHeader className="">
            <CardTitle className="text-3xl font-bold text-center flex items-center justify-center gap-2 text-primary">
              <Sparkles className="w-6 h-6 text-primary" />
              AI Exam Generator
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            <ExamForm formData={formData} onChange={handleFormChange} />
            <AIPromptInput
              value={formData.aiPrompt}
              onChange={(value) => handleFormChange("aiPrompt", value)}
            />
            <GenerateButton onClick={handleSubmit} loading={loading} />
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

function ExamForm({
  formData,
  onChange,
}: {
  formData: any;
  onChange: (key: string, value: string | number) => void;
}) {
  return (
    <div className="space-y-4">
      <FormField
        icon={<BarChart className="w-5 h-5 text-blue-500" />}
        label="Difficulty"
        value={formData.difficulty}
        onChange={(value) => onChange("difficulty", value)}
        options={[
          { value: "easy", label: "Easy" },
          { value: "medium", label: "Medium" },
          { value: "hard", label: "Hard" },
        ]}
      />

      <FormField
        icon={<BookOpen className="w-5 h-5 text-green-500" />}
        label="Class"
        value={formData.class}
        onChange={(value) => onChange("class", value)}
        options={[
          { value: "Not Applicable", label: "Not Applicable" },
          { value: "1st Grade", label: "1st Grade" },
          { value: "2nd Grade", label: "2nd Grade" },
          { value: "3rd Grade", label: "3rd Grade" },
          { value: "4th Grade", label: "4th Grade" },
          { value: "5th Grade", label: "5th Grade" },
          { value: "6th Grade", label: "6th Grade" },
          { value: "7th Grade", label: "7th Grade" },
          { value: "8th Grade", label: "8th Grade" },
          { value: "9th Grade", label: "9th Grade" },
          { value: "10th Grade", label: "10th Grade" },
          { value: "11th Grade", label: "11th Grade" },
          { value: "12th Grade", label: "12th Grade" },
          { value: "College Grade", label: "College Grade" },
          { value: "University Grade", label: "University Grade" },
          { value: "Graduate Grade", label: "Graduate Grade" },
        ]}
      />

      <div className="space-y-2">
        <Label htmlFor="questionCount" className="flex items-center gap-2">
          <Hash className="w-5 h-5 text-purple-500" />
          Number of Questions: {formData.questionCount}
        </Label>
        <Slider
          id="questionCount"
          value={[formData.questionCount]}
          onValueChange={(newValue) => onChange("questionCount", newValue[0])}
          max={40}
          min={10}
          step={10}
          className="w-full"
        />
      </div>
    </div>
  );
}

function FormField({
  icon,
  label,
  value,
  onChange,
  options,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={label.toLowerCase()} className="flex items-center gap-2">
        {icon}
        {label}
      </Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger id={label.toLowerCase()}>
          <SelectValue placeholder={`Select ${label.toLowerCase()}`} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

function AIPromptInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor="ai-prompt" className="flex items-center gap-2">
        <MessageSquare className="w-5 h-5 text-yellow-500" />
        Describe your exam requirements
      </Label>
      <Textarea
        id="ai-prompt"
        placeholder="E.g., Create an exam focusing on World War II, including questions about key events, figures, and impacts."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="min-h-[100px] resize-none"
      />
    </div>
  );
}

interface GenerateButtonProps {
  onClick: () => void;
  loading: boolean;
}

function GenerateButton({ onClick, loading }: GenerateButtonProps) {
  return (
    <Button
      onClick={onClick}
      disabled={loading}
      className="w-full bg-gradient-to-r from-primary to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {loading ? (
        <div>
          <Loader
            // size="sm"
            content="Generating..."
            speed="slow"
            className="!text-white"
          />
        </div>
      ) : (
        "Generate Exam"
      )}
    </Button>
  );
}
