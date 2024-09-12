"use client";

import React, { useState, useRef, useEffect } from "react";
import { useTheme } from "next-themes";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Moon, Sun, Send, Edit2, Save, Upload, RotateCcw } from "lucide-react";
import { OpenAiGptChat } from "../../../../services/gpt";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function AdvancedChatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [systemPrompt, setSystemPrompt] = useState(
    "You are a helpful assistant."
  );
  const { theme, setTheme } = useTheme();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages as Message[]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await OpenAiGptChat(input, systemPrompt);
      setMessages([
        ...newMessages,
        { role: "assistant", content: response },
      ] as Message[]);
    } catch (error) {
      console.error("Error in AI response:", error);
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content: "Sorry, I encountered an error. Please try again.",
        },
      ] as Message[]);
    }

    setIsLoading(false);
  };

  const handleEdit = (index: number) => {
    const messageToEdit = messages[index];
    setInput(messageToEdit.content);
    setMessages(messages.slice(0, index));
  };

  const handleSave = () => {
    const chatData = JSON.stringify(messages);
    const blob = new Blob([chatData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "chat_session.json";
    link.click();
  };

  const handleLoad = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        try {
          const loadedMessages = JSON.parse(content) as Message[];
          setMessages(loadedMessages);
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Chat with Eduifa</h1>
        <div className="flex items-center space-x-2">
          <Switch
            checked={theme === "dark"}
            onCheckedChange={() =>
              setTheme(theme === "dark" ? "light" : "dark")
            }
          />
          {theme === "dark" ? (
            <Moon className="h-4 w-4" />
          ) : (
            <Sun className="h-4 w-4" />
          )}
        </div>
      </div>

      <Card className="flex-grow mb-4 overflow-hidden">
        <ScrollArea className="h-[calc(100vh-250px)]">
          <CardContent>
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                } mb-4`}
              >
                <div
                  className={`flex items-start space-x-2 ${
                    message.role === "user" ? "flex-row-reverse" : ""
                  }`}
                >
                  <Avatar>
                    <AvatarImage
                      src={
                        message.role === "user"
                          ? "/user-avatar.png"
                          : "/ai-avatar.png"
                      }
                    />
                    <AvatarFallback>
                      {message.role === "user" ? "U" : "AI"}
                    </AvatarFallback>
                  </Avatar>
                  <div
                    className={`max-w-[70%] ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    } rounded-lg p-3`}
                  >
                    <ReactMarkdown
                      components={{
                        // @ts-ignore
                        code({ node, inline, className, children, ...props }) {
                          const match = /language-(\w+)/.exec(className || "");
                          return !inline && match ? (
                            // @ts-ignore
                            <SyntaxHighlighter
                              style={tomorrow as any}
                              language={match[1]}
                              PreTag="div"
                              {...props}
                            >
                              {String(children).replace(/\n$/, "")}
                            </SyntaxHighlighter>
                          ) : (
                            <code {...props} className={className}>
                              {children}
                            </code>
                          );
                        },
                      }}
                    >
                      {message.content}
                    </ReactMarkdown>
                    {message.role === "user" && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="mt-2"
                        onClick={() => handleEdit(index)}
                      >
                        <Edit2 className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </CardContent>
        </ScrollArea>
      </Card>

      <div className="flex space-x-2 mb-4">
        <Textarea
          value={systemPrompt}
          onChange={(e) => setSystemPrompt(e.target.value)}
          placeholder="Enter system prompt..."
          className="flex-grow"
        />
      </div>

      <div className="flex space-x-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
          className="flex-grow"
        />
        <Button onClick={handleSend} disabled={isLoading}>
          <Send className="h-4 w-4 mr-2" />
          Send
        </Button>
        <Button onClick={handleSave}>
          <Save className="h-4 w-4 mr-2" />
          Save
        </Button>
        <Button onClick={() => fileInputRef.current?.click()}>
          <Upload className="h-4 w-4 mr-2" />
          Load
        </Button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleLoad}
          style={{ display: "none" }}
          accept=".json"
        />
        <Button onClick={() => setMessages([])}>
          <RotateCcw className="h-4 w-4 mr-2" />
          Clear
        </Button>
      </div>
    </div>
  );
}
