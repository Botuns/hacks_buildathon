"use client";
// @ts-ignore

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PhoneCall, PhoneOff, Mic, MicOff } from "lucide-react";

export default function AIVoiceChat() {
  const [callStatus, setCallStatus] = useState<"idle" | "ringing" | "active">(
    "idle"
  );
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>(
    []
  );
  const [isListening, setIsListening] = useState(false);
  // @ts-ignore
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // @ts-ignore
      recognitionRef.current = new (window.SpeechRecognition ||
        // @ts-ignore
        window.webkitSpeechRecognition)();
      // @ts-ignore
      sysnthRef.current = window.speechSynthesis;
    }
  }, []);

  const startCall = () => {
    setCallStatus("ringing");
    setTimeout(() => {
      setCallStatus("active");
      setMessages([
        { text: "Hello! How can I assist you today?", isUser: false },
      ]);
      speak("Hello! How can I assist you today?");
    }, 2000);
  };

  const endCall = () => {
    setCallStatus("idle");
    setMessages([]);
    setIsListening(false);
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
    }
  };

  const speak = (text: string) => {
    if (synthRef.current) {
      const utterance = new SpeechSynthesisUtterance(text);
      synthRef.current.speak(utterance);
    }
  };

  useEffect(() => {
    if (recognitionRef.current) {
        // @ts-ignore
      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setMessages((prev) => [...prev, { text: transcript, isUser: true }]);

        // Simulate AI response
        setTimeout(() => {
          const aiResponse = `I heard you say: "${transcript}". How can I help with that?`;
          setMessages((prev) => [...prev, { text: aiResponse, isUser: false }]);
          speak(aiResponse);
        }, 1000);
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
            <Button onClick={startCall}>
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
            </div>
            <Button onClick={toggleListening} className="w-full">
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
    </Card>
  );
}
