"use client";

import { useState, useRef, ComponentRef, forwardRef } from "react";
import { VoiceProvider, useVoice } from "@humeai/voice-react";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { AlertCircle, Mic, MicOff, Phone, PhoneOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { AutoSizer } from "react-virtualized";
import MicFFT from "./MicFFT"; // Assuming you've created this component
import Expressions from "./Expressions"; // Assuming you've created this component

function StartCall() {
  const { status, connect } = useVoice();

  return (
    <AnimatePresence>
      {status.value !== "connected" && (
        <motion.div
          className="fixed inset-0 p-4 flex items-center justify-center bg-background"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.5 }}
          >
            <Button
              className="z-50 flex items-center gap-1.5"
              onClick={() => {
                connect().catch(console.error);
              }}
            >
              <Phone className="size-4 opacity-50" strokeWidth={2} />
              <span>Start Call with Eduifa</span>
            </Button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const Messages = forwardRef<HTMLDivElement, {}>(function Messages(props, ref) {
  const { messages } = useVoice();

  return (
    <motion.div
      layoutScroll
      className="grow rounded-md overflow-auto p-4"
      ref={ref}
    >
      <motion.div className="max-w-2xl mx-auto w-full flex flex-col gap-4 pb-24">
        <AnimatePresence mode="popLayout">
          {messages.map((msg, index) => {
            if (
              msg.type === "user_message" ||
              msg.type === "assistant_message"
            ) {
              return (
                <motion.div
                  key={msg.type + index}
                  className={cn(
                    "w-[80%]",
                    "bg-card",
                    "border border-border rounded",
                    msg.type === "user_message" ? "ml-auto" : ""
                  )}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 0 }}
                >
                  <div className="text-xs capitalize font-medium leading-none opacity-50 pt-4 px-3">
                    {msg.message.role}
                  </div>
                  <div className="pb-3 px-3">{msg.message.content}</div>
                  {/* <Expressions values={{ ...msg.models.prosody?.scores }} /> */}
                </motion.div>
              );
            }
            return null;
          })}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
});

function Controls() {
  const { disconnect, status, isMuted, unmute, mute, micFft } = useVoice();

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 w-full p-4 flex items-center justify-center",
        "bg-gradient-to-t from-card via-card/90 to-card/0"
      )}
    >
      <AnimatePresence>
        {status.value === "connected" && (
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            className="p-4 bg-card border border-border rounded-lg shadow-sm flex items-center gap-4"
          >
            <Toggle
              pressed={!isMuted}
              onPressedChange={() => {
                if (isMuted) {
                  unmute();
                } else {
                  mute();
                }
              }}
            >
              {isMuted ? (
                <MicOff className="size-4" />
              ) : (
                <Mic className="size-4" />
              )}
            </Toggle>

            <div className="relative grid h-8 w-48 shrink grow-0">
              <MicFFT fft={micFft} className="fill-current" />
            </div>

            <Button
              className="flex items-center gap-1"
              onClick={disconnect}
              variant="destructive"
            >
              <PhoneOff className="size-4 opacity-50" strokeWidth={2} />
              <span>End Call</span>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function EnhancedAIVoiceChat({
  accessToken,
}: {
  accessToken: string;
}) {
  const messagesRef = useRef<HTMLDivElement>(null);

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-primary">
          Eduifa Voice Assistant
        </CardTitle>
        <CardDescription>
          Have a conversation with our AI-powered voice assistant
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="relative grow flex flex-col mx-auto w-full overflow-hidden h-[600px]">
          <VoiceProvider
            auth={{
              type: "accessToken",
              value: accessToken,
            }}
            onMessage={() => {
              if (messagesRef.current) {
                const scrollHeight = messagesRef.current.scrollHeight;
                messagesRef.current.scrollTo({
                  top: scrollHeight,
                  behavior: "smooth",
                });
              }
            }}
          >
            <Messages ref={messagesRef} />
            <Controls />
            <StartCall />
          </VoiceProvider>
        </div>
      </CardContent>
    </Card>
  );
}
