"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PhoneCall, PhoneOff, Mic, MicOff } from "lucide-react";
import axios from "axios";
import { OpenAiGptVoicechat } from "../../../../services/gpt";

// const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
// const token = process.env.NEXT_PUBLIC_API_TOKEN;

// async function OpenAiGptVoicechat(prompt: string, systemPrompt: string) {
//   try {
//     const messages = { role: "user", content: prompt };

//     const response = await axios.post(
//       `${BASE_URL}/knowledge-base`,
//       {
//         model: "gpt-4o-mini",
//         messages: [
//           {
//             role: "system",
//             content: systemPrompt,
//           },
//           messages,
//         ],
//       },
//       {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );

//     const AIRESULT = response?.data?.data?.choices[0]?.message;
//     const generatedContent = AIRESULT?.content;
//     const formattedData = JSON.parse(generatedContent);

//     return formattedData;
//   } catch (error) {
//     console.error("Error while fetching AI response:", error);
//     return [];
//   }
// }

export default function AIVoiceChat() {
  const [callStatus, setCallStatus] = useState<"idle" | "ringing" | "active">(
    "idle"
  );
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>(
    []
  );
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showModal, setShowModal] = useState(false);
  // @ts-ignore
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // @ts-ignore
      recognitionRef.current = new (window.SpeechRecognition ||
        // @ts-ignore
        window.webkitSpeechRecognition)();
      synthRef.current = window.speechSynthesis;
    }
  }, []);

  const startCall = () => {
    setCallStatus("ringing");
    setTimeout(() => {
      setCallStatus("active");
      const initialMessage = "Hello! How can I assist you today?";
      setMessages([{ text: initialMessage, isUser: false }]);
      speak(initialMessage);
    }, 2000);
  };

  const endCall = () => {
    setCallStatus("idle");
    setMessages([]);
    setIsListening(false);
    setShowModal(false);
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    if (synthRef.current) {
      synthRef.current.cancel();
    }
  };

  const toggleListening = () => {
    if (isListening) {
      setIsListening(false);
      recognitionRef.current?.stop();
    } else {
      setIsListening(true);
      recognitionRef.current?.start();
      setShowModal(true);
    }
  };

  const speak = (text: string) => {
    if (synthRef.current) {
      setIsSpeaking(true);
      setShowModal(true);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onend = () => {
        setIsSpeaking(false);
      };
      synthRef.current.speak(utterance);
    }
  };

  const getAIResponse = async (userMessage: string) => {
    setIsLoading(true);
    try {
      const systemPrompt =
        "You are a helpful AI assistant in a voice chat. Provide concise and relevant responses.";
      const aiResponse = await OpenAiGptVoicechat(userMessage, systemPrompt);

      if (Array.isArray(aiResponse) && aiResponse.length > 0) {
        const responseText =
          aiResponse[0].text || "I'm sorry, I couldn't generate a response.";
        setMessages((prev) => [...prev, { text: responseText, isUser: false }]);
        speak(responseText);
      } else {
        throw new Error("Invalid AI response format");
      }
    } catch (error) {
      console.error("Error getting AI response:", error);
      const errorMessage =
        "I'm sorry, I encountered an error. Please try again.";
      setMessages((prev) => [...prev, { text: errorMessage, isUser: false }]);
      speak(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (recognitionRef.current) {
      // @ts-ignore
      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setMessages((prev) => [...prev, { text: transcript, isUser: true }]);
        getAIResponse(transcript);
      };

      recognitionRef.current.onend = () => {
        if (isListening) {
          recognitionRef.current?.start();
        }
      };
    }
  }, [isListening]);

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">AI Voice Chat</h2>
          {callStatus === "idle" ? (
            <Button
              onClick={startCall}
              className="bg-green-500 hover:bg-green-600"
            >
              <PhoneCall className="mr-2 h-4 w-4" /> Start Call
            </Button>
          ) : (
            <Button onClick={endCall} variant="destructive">
              <PhoneOff className="mr-2 h-4 w-4" /> End Call
            </Button>
          )}
        </div>

        {callStatus === "ringing" && (
          <div className="text-center py-4">
            <p className="text-lg">Ringing...</p>
          </div>
        )}

        {callStatus === "active" && (
          <>
            <div className="h-64 overflow-y-auto mb-4 p-4 border rounded">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`mb-2 ${
                    message.isUser ? "text-right" : "text-left"
                  }`}
                >
                  <span
                    className={`inline-block p-2 rounded ${
                      message.isUser ? "bg-blue-100" : "bg-gray-100"
                    }`}
                  >
                    {message.text}
                  </span>
                </div>
              ))}
              {isLoading && (
                <div className="text-center">
                  <p>AI is thinking...</p>
                </div>
              )}
            </div>
            <Button
              onClick={toggleListening}
              className="w-full"
              disabled={isLoading || isSpeaking}
            >
              {isListening ? (
                <>
                  <MicOff className="mr-2 h-4 w-4" /> Stop Listening
                </>
              ) : (
                <>
                  <Mic className="mr-2 h-4 w-4" /> Start Listening
                </>
              )}
            </Button>
          </>
        )}
      </CardContent>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {isSpeaking ? "AI Speaking" : "Your Turn"}
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center p-4">
            {isSpeaking ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse"></div>
                <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse delay-75"></div>
                <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse delay-150"></div>
              </div>
            ) : (
              <Button
                onClick={toggleListening}
                className="mt-4"
                disabled={isLoading}
              >
                {isListening ? "Stop Responding" : "Respond"}
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
