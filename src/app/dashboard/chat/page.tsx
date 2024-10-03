// @ts-nocheck
"use client";

import React, { useState, useRef, useEffect } from "react";
import { useTheme } from "next-themes";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";
import { motion, AnimatePresence } from "framer-motion";
import {
  Moon,
  Sun,
  Send,
  Edit2,
  Save,
  Upload,
  RotateCcw,
  Plus,
  Minimize2,
  Maximize2,
  Settings,
  HelpCircle,
} from "lucide-react";

import { OpenAiGptChat } from "../../../../services/gpt";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";

const TypingIndicator = () => (
  <div className="flex space-x-2 p-2 bg-primary/10 rounded-lg">
    <div
      className="w-2 h-2 bg-primary rounded-full animate-bounce"
      style={{ animationDelay: "0s" }}
    ></div>
    <div
      className="w-2 h-2 bg-primary rounded-full animate-bounce"
      style={{ animationDelay: "0.2s" }}
    ></div>
    <div
      className="w-2 h-2 bg-primary rounded-full animate-bounce"
      style={{ animationDelay: "0.4s" }}
    ></div>
  </div>
);

const MessageBubble = ({ message, onEdit }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -50 }}
    transition={{ duration: 0.3 }}
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
          src={message.role === "user" ? "/user-avatar.png" : "/ai-avatar.png"}
        />
        <AvatarFallback>{message.role === "user" ? "U" : "AI"}</AvatarFallback>
      </Avatar>
      <Card
        className={`max-w-[80%] ${
          message.role === "user"
            ? "bg-primary text-primary-foreground"
            : "bg-secondary"
        }`}
      >
        <CardContent className="p-3">
          <ReactMarkdown
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || "");
                return !inline && match ? (
                  <SyntaxHighlighter
                    style={tomorrow as any}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                  >
                    {String(children).replace(/\n$/, "")}
                  </SyntaxHighlighter>
                ) : (
                  <code className={className} {...props}>
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
              onClick={() => onEdit(message.content)}
            >
              <Edit2 className="h-4 w-4 mr-2" />
              Edit
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  </motion.div>
);

const ChatwithEduifa = () => {
  type Message = {
    role: "user" | "assistant";
    content: string;
  };

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [systemPrompt, setSystemPrompt] = useState(
    "You are a helpful assistant."
  );
  const [isCompactView, setIsCompactView] = useState(false);
  const { theme, setTheme } = useTheme();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isPromptDialogOpen, setIsPromptDialogOpen] = useState(false);
  const [isHelpDialogOpen, setIsHelpDialogOpen] = useState(false);
  const [autoScroll, setAutoScroll] = useState(true);

  useEffect(() => {
    if (autoScroll) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, autoScroll]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await OpenAiGptChat(input, systemPrompt);
      setMessages([...newMessages, { role: "assistant", content: response }]);
    } catch (error) {
      console.error("Error in AI response:", error);
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content: "Sorry, I encountered an error. Please try again.",
        },
      ]);
    }

    setIsLoading(false);
  };

  const handleEdit = (content: string) => {
    setInput(content);
    setMessages(messages.slice(0, -1));
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
        try {
          const loadedMessages = JSON.parse(e.target.result as string);
          setMessages(loadedMessages);
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div
      className={`flex flex-col h-screen max-w-4xl mx-auto p-4 transition-all duration-300 ease-in-out ${
        isCompactView ? "max-w-lg" : "md:max-w-full"
      }`}
    >
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Chat with Eduifa</h1>
        <div className="flex items-center space-x-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsHelpDialogOpen(true)}
                >
                  <HelpCircle className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Help</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Settings</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setIsPromptDialogOpen(true)}>
                Edit System Prompt
              </DropdownMenuItem>
              <DropdownMenuItem>
                <div className="flex items-center justify-between w-full">
                  <span>Auto-scroll</span>
                  <Switch
                    checked={autoScroll}
                    onCheckedChange={setAutoScroll}
                  />
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <div className="flex items-center justify-between w-full">
                  <span>Dark Mode</span>
                  <Switch
                    checked={theme === "dark"}
                    onCheckedChange={() =>
                      setTheme(theme === "dark" ? "light" : "dark")
                    }
                  />
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCompactView(!isCompactView)}
          >
            {isCompactView ? (
              <Maximize2 className="h-4 w-4" />
            ) : (
              <Minimize2 className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      <Card className="flex-grow mb-4 overflow-hidden">
        <ScrollArea className="h-[calc(100vh-200px)]">
          <CardContent>
            <AnimatePresence>
              {messages.map((message, index) => (
                <MessageBubble
                  key={index}
                  message={message}
                  onEdit={handleEdit}
                />
              ))}
            </AnimatePresence>
            {isLoading && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </CardContent>
        </ScrollArea>
      </Card>

      <div className="flex space-x-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          onKeyPress={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
          className="flex-grow"
        />
        <Button onClick={handleSend} disabled={isLoading}>
          <Send className="h-4 w-4 mr-2" />
          Send
        </Button>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button onClick={handleSave}>
                <Save className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Save Chat</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button onClick={() => fileInputRef.current?.click()}>
                <Upload className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Load Chat</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleLoad}
          style={{ display: "none" }}
          accept=".json"
        />
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button onClick={() => setMessages([])}>
                <RotateCcw className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Clear Chat</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <Dialog open={isPromptDialogOpen} onOpenChange={setIsPromptDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit System Prompt</DialogTitle>
            <DialogDescription>
              Customize the AI&apos;s behavior by modifying the system prompt.
            </DialogDescription>
          </DialogHeader>
          <Textarea
            value={systemPrompt}
            onChange={(e) => setSystemPrompt(e.target.value)}
            placeholder="Enter system prompt..."
            rows={5}
          />
          <DialogFooter>
            <Button onClick={() => setIsPromptDialogOpen(false)}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isHelpDialogOpen} onOpenChange={setIsHelpDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Chat with Eduifa - Help</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p>
              Welcome to Chat with Eduifa! Here are some tips to get you
              started:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                Type your message in the input box and press Enter or click Send
                to chat with Eduifa.
              </li>
              <li>
                Use the Edit button on your messages to modify them before
                resending.
              </li>
              <li>
                Save your chat session using the Save button and load it later
                with the Upload button.
              </li>
              <li>Clear the entire chat history with the Reset button.</li>
              <li>
                Customize Eduifa&apos;s behavior by editing the system prompt in
                the Settings menu.
              </li>
              <li>
                Toggle between compact and full-width view using the resize
                button.
              </li>
              <li>Switch between light and dark mode in the Settings menu.</li>
            </ul>
          </div>
          <DialogFooter>
            <Button onClick={() => setIsHelpDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ChatwithEduifa;
