"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
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
import { Sparkles } from "lucide-react";
import { generateExam } from "@/app/helpers";
import type { DifficultyLevel, Exam } from "@/lib/exam";
import { toast, Toaster } from "sonner";
import { useExamStore } from "@/app/hooks/providers/examStore";
import { generateExamQuestions } from "../../../../services/ai-sdk";

export default function Component() {
  const router = useRouter();
  const { startExam } = useExamStore();
  const [formData, setFormData] = useState({
    difficulty: "",
    examType: "Multi-choice",
    class: "",
    questionCount: 15,
    description: "",
  });
  const [loading, setLoading] = useState(false);

  const handleFormChange = (key: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // const exam = await generateExam(
      //   formData.difficulty as DifficultyLevel,
      //   formData.class,
      //   formData.description,
      //   formData.questionCount
      // );
      // @ts-ignore
      const exam: Exam = await generateExamQuestions(
        formData.difficulty as DifficultyLevel,
        formData.class,
        formData.description,
        formData.questionCount
      );
      if (!exam.title) {
        console.log("error at the object" + exam);
        toast.error("Failed to generate exam");
        return;
      }
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
    <div className="min-h-screen p-0">
      <Toaster richColors />
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-semibold">AI-exam generator</h1>
          <Button
            variant="outline"
            className="gap-2 bg-gradient-to-r from-blue-600 to-purple-400 text-transparent bg-clip-text rounded-full shadow-lg"
          >
            <Sparkles className="w-4 h-4 !text-blue-500" />
            Upgrade to Pro
          </Button>
        </div>

        <div className="mb-8">
          <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-400 text-transparent bg-clip-text">
            Generate Exam Questions
          </h2>
        </div>

        <Card className="p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Difficulty level</Label>
                <Select
                  value={formData.difficulty}
                  onValueChange={(value) =>
                    handleFormChange("difficulty", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Easy">Easy</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Exam type</Label>
                <Select
                  value={formData.examType}
                  onValueChange={(value) => handleFormChange("examType", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select exam type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Multi-choice">Multi-choice</SelectItem>
                    <SelectItem value="True/False">True/False</SelectItem>
                    <SelectItem value="Short Answer">Short Answer</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Class</Label>
                <Select
                  value={formData.class}
                  onValueChange={(value) => handleFormChange("class", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select class" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Not Applicable">
                      Not Applicable
                    </SelectItem>
                    <SelectItem value="1st Grade">1st Grade</SelectItem>
                    <SelectItem value="2nd Grade">2nd Grade</SelectItem>
                    <SelectItem value="3rd Grade">3rd Grade</SelectItem>
                    <SelectItem value="4th Grade">4th Grade</SelectItem>
                    <SelectItem value="5th Grade">5th Grade</SelectItem>
                    <SelectItem value="6th Grade">6th Grade</SelectItem>
                    <SelectItem value="7th Grade">7th Grade</SelectItem>
                    <SelectItem value="8th Grade">8th Grade</SelectItem>
                    <SelectItem value="9th Grade">9th Grade</SelectItem>
                    <SelectItem value="10th Grade">10th Grade</SelectItem>
                    <SelectItem value="11th Grade">11th Grade</SelectItem>
                    <SelectItem value="12th Grade">12th Grade</SelectItem>
                    <SelectItem value="College Grade">College Grade</SelectItem>
                    <SelectItem value="University Grade">
                      University Grade
                    </SelectItem>
                    <SelectItem value="Graduate Grade">
                      Graduate Grade
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Number of questions: {formData.questionCount}</Label>
                <Slider
                  value={[formData.questionCount]}
                  onValueChange={(value) =>
                    handleFormChange("questionCount", value[0])
                  }
                  max={40}
                  min={10}
                  step={1}
                  className="w-full"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                placeholder="Eg. Create exam questions focusing on world war II, including questions about key events."
                value={formData.description}
                onChange={(e) =>
                  handleFormChange("description", e.target.value)
                }
                className="min-h-[120px] resize-none"
              />
            </div>

            <div className="flex justify-end">
              <Button
                onClick={handleSubmit}
                disabled={loading}
                className="bg-blue-600 text-white hover:bg-blue-700 px-8"
              >
                {loading ? "Generating..." : "Generate"}
              </Button>
            </div>
          </motion.div>
        </Card>
      </div>
    </div>
  );
}
