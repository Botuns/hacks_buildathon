// @ts-nocheck
"use client";

// @ts-nocheck
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import {
  ChevronRight,
  Upload,
  Send,
  Loader2,
  Download,
  ChevronLeft,
} from "lucide-react";
// import { Document, Page, pdfjs } from "react-pdf";
import { toast, Toaster } from "sonner";
import { jsPDF } from "jspdf";
import { MDXRemote } from "next-mdx-remote";
import mdxComponents from "@/components/mdxComponents";
import { serialize } from "next-mdx-remote/serialize";
import html2canvas from "html2canvas";
import ReactDOMServer from "react-dom/server";

// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

import {
  chatWithPDF,
  extractTextFromPDF,
  generateQuestions,
} from "@/lib/pdf-utils";

export default function ChatWithPDF() {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pdfText, setPdfText] = useState<string>("");
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [messages, setMessages] = useState<
    { role: "user" | "assistant"; content: string }[]
  >([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [questionCount, setQuestionCount] = useState(5);
  const [difficulty, setDifficulty] = useState("medium");
  const [generatedQuestions, setGeneratedQuestions] = useState<string>("");
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

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
      setPdfUrl(URL.createObjectURL(file));
      toast.success("PDF uploaded and text extracted successfully");
    } catch (error) {
      console.error("Failed to extract text from PDF:", error);
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
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop =
          chatContainerRef.current.scrollHeight;
      }
    } catch (error) {
      console.error("Error chatting with PDF:", error);
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
      toast.success("Questions generated successfully");
    } catch (error) {
      console.error("Error generating questions:", error);
      toast.error("Failed to generate questions");
    } finally {
      setIsLoading(false);
    }
  };

  //   const handleDownloadQuestions = () => {
  //     if (!generatedQuestions) return;
  //     const doc = new jsPDF();
  //     const splitText = doc.splitTextToSize(generatedQuestions, 180);
  //     doc.text(splitText, 15, 15);
  //     doc.save("generated_questions.pdf");
  //   };

  // const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
  //   setNumPages(numPages);
  //   setPageNumber(1);
  // };

  const handleDownloadQuestions = async (serializedMdxContent: any) => {
    if (!serializedMdxContent) return;

    const container = document.createElement("div");
    document.body.appendChild(container);

    const mdxElement = (
      <MDXRemote {...serializedMdxContent} components={mdxComponents} />
    );
    container.innerHTML = ReactDOMServer.renderToString(mdxElement);

    const canvas = await html2canvas(container);

    document.body.removeChild(container);

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    const margin = 15;

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    const imgProps = pdf.getImageProperties(imgData);
    const imgWidth = imgProps.width;
    const imgHeight = imgProps.height;

    const scale = Math.min(
      (pdfWidth - 2 * margin) / imgWidth,
      (pdfHeight - 2 * margin) / imgHeight
    );

    const imgScaledWidth = imgWidth * scale;
    const imgScaledHeight = imgHeight * scale;
    const xOffset = (pdfWidth - imgScaledWidth) / 2;
    const yOffset = (pdfHeight - imgScaledHeight) / 2;

    pdf.addImage(
      imgData,
      "PNG",
      xOffset,
      yOffset,
      imgScaledWidth,
      imgScaledHeight
    );

    pdf.save("generated_questions.pdf");
  };
  const prepareDownload = async () => {
    const serializedMdxContent = await serialize(generatedQuestions);

    handleDownloadQuestions(serializedMdxContent);
  };
  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <Toaster richColors />
      <h1 className="text-3xl font-bold mb-6 text-center">
        👋 Hi! I&apos;m EduIfa, your AI assistant 🤖
      </h1>
      <div className="flex flex-col md:flex-row gap-4">
        <Card className="w-full md:w-1/2 h-[calc(100vh-12rem)]">
          <CardContent className="p-4 h-full">
            {pdfFile && pdfUrl ? (
              <iframe
                src={pdfUrl}
                className="w-full h-full border-none"
                title="PDF Viewer"
              />
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
        <Card className="w-full md:w-1/2 h-[calc(100vh-12rem)] flex flex-col">
          <Tabs defaultValue="chat" className="flex-grow flex flex-col ">
            <TabsList className="w-full justify-start bg-primary text-white">
              <TabsTrigger value="chat">Chat</TabsTrigger>
              <TabsTrigger value="generate">Generate Questions</TabsTrigger>
            </TabsList>
            <TabsContent value="chat" className="flex-grow flex flex-col p-4">
              <div
                ref={chatContainerRef}
                className="flex-grow overflow-auto mb-4 pr-2"
              >
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
                          ? "bg-blue-600 text-white"
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
            <TabsContent value="generate" className="p-4 overflow-auto">
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
                  {!isLoading ? (
                    "Generate Questions"
                  ) : (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  )}
                </Button>
                {generatedQuestions && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">
                      Generated Questions:
                    </h3>
                    <div className="bg-gray-100 p-4 rounded-lg mb-4 max-h-60 overflow-auto">
                      <pre className="whitespace-pre-wrap">
                        {generatedQuestions}
                      </pre>
                    </div>
                    <Button onClick={prepareDownload} className="w-full">
                      <Download className="w-4 h-4 mr-2" />
                      Download Questions (PDF)
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
