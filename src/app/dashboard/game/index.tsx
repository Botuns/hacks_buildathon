"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Mic,
  MicOff,
  Award,
  RefreshCcw,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { Toggle } from "@/components/ui/toggle";

const challenges = [
  { type: "math", question: "What is 7 * 8?", answer: "56" },
  {
    type: "english",
    question: 'Spell "algorithm" backwards',
    answer: "mhtirogla",
  },
  {
    type: "code",
    question: "What does HTML stand for?",
    answer: "hypertext markup language",
  },
  { type: "math", question: "What is the square root of 144?", answer: "12" },
  {
    type: "english",
    question: 'What is the past tense of "code"?',
    answer: "coded",
  },
  {
    type: "code",
    question: "What symbol is used for single-line comments in JavaScript?",
    answer: "//",
  },
  { type: "math", question: "What is 15% of 200?", answer: "30" },
  {
    type: "english",
    question: 'What is the opposite of "ascending"?',
    answer: "descending",
  },
  {
    type: "code",
    question: "What does CSS stand for?",
    answer: "cascading style sheets",
  },
  { type: "math", question: "If x = 5 and y = 3, what is x^y?", answer: "125" },
];

const boardSize = 25;
const ladders = [
  { start: 3, end: 11 },
  { start: 6, end: 17 },
  { start: 9, end: 18 },
  { start: 14, end: 23 },
];
const snakes = [
  { start: 19, end: 7 },
  { start: 24, end: 16 },
  { start: 21, end: 13 },
];

function GameBoard() {
  const [gameState, setGameState] = useState<"idle" | "playing" | "finished">(
    "idle"
  );
  const [position, setPosition] = useState(1);
  const [currentChallenge, setCurrentChallenge] = useState(challenges[0]);
  const [feedback, setFeedback] = useState("");
  const [timeLeft, setTimeLeft] = useState(60);
  const [isMuted, setIsMuted] = useState(true);
  // @ts-ignore
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // @ts-ignore
      recognitionRef.current = new (window.SpeechRecognition ||
        // @ts-ignore
        window.webkitSpeechRecognition)();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = false;

      recognitionRef.current.onresult = (event: any) => {
        const last = event.results.length - 1;
        const userAnswer = event.results[last][0].transcript;
        checkAnswer(userAnswer);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error("Speech recognition error", event.error);
        setFeedback("Sorry, I didn't catch that. Please try again.");
      };
    } else {
      console.error("Speech recognition not supported");
      setFeedback("Speech recognition is not supported in this browser.");
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);
  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     recognitionRef.current = new (window.SpeechRecognition ||
  //       window.webkitSpeechRecognition)();
  //     synthRef.current = window.speechSynthesis;
  //   }
  // }, []);
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gameState === "playing" && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0) {
      endGame();
    }
    return () => clearTimeout(timer);
  }, [timeLeft, gameState]);

  const startGame = () => {
    setGameState("playing");
    setPosition(1);
    setTimeLeft(60);
    nextChallenge();
  };

  const endGame = () => {
    setGameState("finished");
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsMuted(true);
  };

  const nextChallenge = () => {
    const nextChallenge =
      challenges[Math.floor(Math.random() * challenges.length)];
    setCurrentChallenge(nextChallenge);
  };

  const checkAnswer = (userAnswer: string) => {
    if (
      userAnswer.toLowerCase().trim() === currentChallenge.answer.toLowerCase()
    ) {
      setFeedback("Correct! Moving up the board.");
      movePlayer(Math.floor(Math.random() * 3) + 1); // Move 1-3 spaces
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    } else {
      setFeedback("Incorrect. Try again!");
    }
    nextChallenge();
  };

  const movePlayer = (spaces: number) => {
    let newPosition = position + spaces;

    // Check for ladders
    const ladder = ladders.find((l) => l.start === newPosition);
    if (ladder) {
      newPosition = ladder.end;
      setFeedback((prevFeedback) => `${prevFeedback} You found a ladder!`);
    }

    // Check for snakes
    const snake = snakes.find((s) => s.start === newPosition);
    if (snake) {
      newPosition = snake.end;
      setFeedback((prevFeedback) => `${prevFeedback} Oh no! A snake got you!`);
    }

    if (newPosition >= boardSize) {
      setPosition(boardSize);
      endGame();
    } else {
      setPosition(newPosition);
    }
  };

  const toggleMute = () => {
    if (isMuted) {
      if (recognitionRef.current) {
        recognitionRef.current.start();
      }
    } else {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    }
    setIsMuted(!isMuted);
  };

  const renderBoard = () => {
    return (
      <div className="grid grid-cols-5 gap-2 mb-4">
        {Array.from({ length: boardSize }, (_, i) => i + 1).map((square) => (
          <div
            key={square}
            className={`w-12 h-12 border-2 ${
              position === square
                ? "bg-yellow-300 border-yellow-500"
                : "bg-white border-gray-300"
            } rounded-lg flex items-center justify-center text-lg font-bold`}
          >
            {square}
            {ladders.some((l) => l.start === square) && (
              <ChevronUp className="text-green-500" />
            )}
            {snakes.some((s) => s.start === square) && (
              <ChevronDown className="text-red-500" />
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <Card className="w-full max-w-4xl mx-auto bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-white text-center">
          Voice Coder&apos;s Ascent
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <AnimatePresence mode="wait">
          {gameState === "idle" && (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center"
            >
              <Button
                onClick={startGame}
                size="lg"
                className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded-full shadow-lg"
              >
                Start Game
              </Button>
            </motion.div>
          )}
          {gameState === "playing" && (
            <motion.div
              key="playing"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {renderBoard()}
              <div className="text-center">
                <h2 className="text-2xl font-bold text-white mb-2">
                  Current Challenge ({currentChallenge.type}):
                </h2>
                <p className="text-xl text-white">
                  {currentChallenge.question}
                </p>
              </div>
              <Toggle
                pressed={!isMuted}
                onPressedChange={toggleMute}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full shadow-lg flex items-center justify-center"
              >
                {isMuted ? (
                  <MicOff className="mr-2 h-4 w-4" />
                ) : (
                  <Mic className="mr-2 h-4 w-4" />
                )}
                {isMuted ? "Unmute Microphone" : "Mute Microphone"}
              </Toggle>
              <div className="text-center text-white font-bold">{feedback}</div>
              <div className="flex justify-between items-center text-white">
                <div>Position: {position}</div>
                <div>Time Left: {timeLeft}s</div>
              </div>
              <Progress value={(timeLeft / 60) * 100} className="w-full" />
            </motion.div>
          )}
          {gameState === "finished" && (
            <motion.div
              key="finished"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center space-y-4"
            >
              <h2 className="text-3xl font-bold text-white">Game Over!</h2>
              <p className="text-xl text-white">
                You reached position {position} on the board!
              </p>
              <Award className="w-16 h-16 mx-auto text-yellow-300" />
              <Button
                onClick={startGame}
                size="lg"
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full shadow-lg flex items-center justify-center"
              >
                <RefreshCcw className="mr-2" /> Play Again
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}

export default function VoiceCodersAscent() {
  return <GameBoard />;
}
