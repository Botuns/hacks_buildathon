"use client";

import React, { useState, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { ChevronRight, Upload, Send, Loader2, Download } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  chatWithPDF,
  extractTextFromPDF,
  generateQuestions,
} from "@/lib/pdf-utils";
import { toast, Toaster } from "sonner";
import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function ChatWithPDF() {
  const [pageNumber, setPageNumber] = useState(1);
  const [pdfFile, setPdfFile] = useState<File | null>(null);

  const [pdfText, setPdfText] = useState<string>("");
  const [messages, setMessages] = useState<
    { role: "user" | "assistant"; content: string }[]
  >([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [questionCount, setQuestionCount] = useState(5);
  const [difficulty, setDifficulty] = useState("medium");
  const [generatedQuestions, setGeneratedQuestions] = useState<string>("");
  const [numPages, setNumPages] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setIsLoading(true);
    try {
      const text = await extractTextFromPDF(file);
      setPdfText(text);
      setPdfFile(file);
      //   notification.success({ message:  });
      toast.success("Text extracted successfully");
    } catch (error) {
      console.error("Failed to extract text from PDF:", error);
      //   notification.error({ message: "Failed to extract text from PDF" });
      toast.error("Failed to extract text from PDF");
    } finally {
      setIsLoading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || !pdfText) return;
    setMessages((prev) => [...prev, { role: "user", content: inputMessage }]);
    setInputMessage("");
    setIsLoading(true);

    try {
      const response = await chatWithPDF(pdfText, inputMessage);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: response },
      ]);
    } catch (error) {
      console.error("Error chatting with PDF:", error);
      //   notification.error({ message: "Failed to process your question" });
      toast.error("Failed to process your question");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateQuestions = async () => {
    if (!pdfText) return;
    setIsLoading(true);
    try {
      const questions = await generateQuestions(
        pdfText,
        questionCount,
        difficulty
      );
      setGeneratedQuestions(questions);
      //   notification.success({ message: "Questions generated successfully" });
      toast.success("Questions generated successfully");
    } catch (error) {
      console.error("Error generating questions:", error);
      //   notification.error({ message: "Failed to generate questions" });
      toast.error("Failed to generate questions");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadQuestions = () => {
    if (!generatedQuestions) return;
    const element = document.createElement("a");
    const file = new Blob([generatedQuestions], { type: "text/markdown" });
    element.href = URL.createObjectURL(file);
    element.download = "generated_questions.md";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };
  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setPageNumber(1);
  };
  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <Toaster richColors />
      <h1 className="text-3xl font-bold mb-6">
        {" "}
        Hi, I am Eduifa and I help you understand your pdf
      </h1>
      <div className="flex gap-4">
        <Card className="w-1/2 h-[calc(100vh-10rem)]">
          <CardContent className="p-4">
            {pdfFile ? (
              <div className="h-full overflow-auto">
                <Document
                  file={pdfFile}
                  onLoadSuccess={onDocumentLoadSuccess}
                  className="h-full"
                >
                  <Page pageNumber={pageNumber} />
                </Document>
                <div className="mt-4 flex justify-between">
                  <Button
                    onClick={() =>
                      setPageNumber((page) => Math.max(page - 1, 1))
                    }
                    disabled={pageNumber <= 1}
                  >
                    Previous
                  </Button>
                  <span>
                    Page {pageNumber} of {numPages}
                  </span>
                  <Button
                    onClick={() =>
                      setPageNumber((page) => Math.min(page + 1, numPages || 1))
                    }
                    disabled={pageNumber >= (numPages || 1)}
                  >
                    Next
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full border-2 border-dashed border-gray-300 rounded-lg">
                <label htmlFor="pdf-upload" className="cursor-pointer">
                  <div className="flex flex-col items-center">
                    <Upload className="w-12 h-12 text-gray-400" />
                    <span className="mt-2 text-sm text-gray-500">
                      Upload PDF
                    </span>
                  </div>
                  <Input
                    id="pdf-upload"
                    type="file"
                    accept=".pdf"
                    className="hidden"
                    onChange={handleFileUpload}
                    ref={fileInputRef}
                  />
                </label>
              </div>
            )}
          </CardContent>
        </Card>
        <Card className="w-1/2 h-[calc(100vh-10rem)] flex flex-col">
          <Tabs defaultValue="chat" className="flex-grow flex flex-col">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="chat">Chat</TabsTrigger>
              <TabsTrigger value="generate">Generate Questions</TabsTrigger>
            </TabsList>
            <TabsContent value="chat" className="flex-grow flex flex-col p-4">
              <div className="flex-grow overflow-auto mb-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`mb-2 ${
                      message.role === "user" ? "text-right" : "text-left"
                    }`}
                  >
                    <span
                      className={`inline-block p-2 rounded-lg ${
                        message.role === "user"
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200"
                      }`}
                    >
                      {message.content}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex items-center">
                <Textarea
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Ask a question about the PDF..."
                  className="flex-grow mr-2"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={isLoading || !pdfText}
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="generate" className="p-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="question-count">Number of Questions</Label>
                  <Slider
                    id="question-count"
                    min={1}
                    max={20}
                    step={1}
                    value={[questionCount]}
                    onValueChange={(value) => setQuestionCount(value[0])}
                    className="my-2"
                  />
                  <span>{questionCount}</span>
                </div>
                <div>
                  <Label htmlFor="difficulty">Difficulty</Label>
                  <select
                    id="difficulty"
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                    className="w-full p-2 border rounded"
                  >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>
                <Button
                  onClick={handleGenerateQuestions}
                  className="w-full"
                  disabled={isLoading || !pdfText}
                >
                  Generate Questions
                </Button>
                {generatedQuestions && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">
                      Generated Questions:
                    </h3>
                    <div className="bg-gray-100 p-4 rounded-lg mb-4">
                      <pre className="whitespace-pre-wrap">
                        {generatedQuestions}
                      </pre>
                    </div>
                    <Button
                      onClick={handleDownloadQuestions}
                      className="w-full"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download Questions (MDX)
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}
