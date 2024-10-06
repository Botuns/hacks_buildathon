// "use client";

// import { useState, useEffect, useRef } from "react";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
//   CardDescription,
// } from "@/components/ui/card";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
// import {
//   PhoneCall,
//   PhoneOff,
//   Mic,
//   MicOff,
//   AlertCircle,
//   Volume2,
// } from "lucide-react";
// import { cn } from "@/lib/utils";
// import { OpenAi } from "../../../../services/gpt";

// export default function EnhancedAIVoiceChat() {
//   const [callStatus, setCallStatus] = useState<"idle" | "ringing" | "active">(
//     "idle"
//   );
//   const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>(
//     []
//   );
//   const [isListening, setIsListening] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isSpeaking, setIsSpeaking] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const beepRef = useRef<HTMLAudioElement | null>(null);
//   // @ts-ignore
//   const recognitionRef = useRef<SpeechRecognition | null>(null);
//   const synthRef = useRef<SpeechSynthesis | null>(null);
//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       // @ts-ignore
//       recognitionRef.current = new (window.SpeechRecognition ||
//         // @ts-ignore
//         window.webkitSpeechRecognition)();
//       synthRef.current = window.speechSynthesis;
//     }
//   }, []);

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   const startCall = () => {
//     setCallStatus("ringing");
//     if (!beepRef.current) {
//       beepRef.current = new Audio("/calling.mp3");
//       beepRef.current.loop = true;
//     }
//     beepRef.current.play();
//     setTimeout(() => {
//       setCallStatus("active");
//       if (beepRef.current) {
//         beepRef.current.pause();
//         beepRef.current.currentTime = 0;
//       }
//       const initialMessage = "Hello, I am Eduifa! How can I assist you today?";
//       setMessages([{ text: initialMessage, isUser: false }]);
//       speak(initialMessage);
//     }, 3000);
//   };

//   const endCall = () => {
//     setCallStatus("idle");
//     setMessages([]);
//     setIsListening(false);
//     setShowModal(false);
//     if (recognitionRef.current) {
//       recognitionRef.current.stop();
//     }
//     if (synthRef.current) {
//       synthRef.current.cancel();
//     }
//   };

//   const toggleListening = () => {
//     if (isListening) {
//       setIsListening(false);
//       recognitionRef.current?.stop();
//     } else {
//       setIsListening(true);
//       recognitionRef.current?.start();
//       setShowModal(true);
//     }
//   };

//   const speak = (text: string) => {
//     if (synthRef.current) {
//       setIsSpeaking(true);
//       setShowModal(true);

//       const utterance = new SpeechSynthesisUtterance(text);

//       utterance.lang = "en-GB";
//       utterance.pitch = 1;
//       utterance.rate = 1;
//       utterance.volume = 1;

//       const voices = synthRef.current.getVoices();

//       const preferredVoices = [
//         "Google UK English Female",
//         "Google UK English Male",
//         "Microsoft Zira - English (United States)",
//         "Google US English",
//       ];

//       const selectedVoice = voices.find((voice) =>
//         preferredVoices.includes(voice.name)
//       );

//       if (selectedVoice) {
//         utterance.voice = selectedVoice;
//         console.log(`Using voice: ${selectedVoice.name}`);

//         if (selectedVoice.lang !== "en-GB") {
//           utterance.lang = selectedVoice.lang;
//         }
//       } else {
//         console.warn(
//           "None of the preferred voices found. Using default voice."
//         );
//       }

//       utterance.onend = () => {
//         setIsSpeaking(false);
//       };

//       synthRef.current.speak(utterance);
//     }
//   };

//   const getAIResponse = async (userMessage: string) => {
//     setIsLoading(true);
//     try {
//       const systemPrompt =
//         "You are a helpful AI assistant in a voice chat. Provide concise and relevant responses.";
//       const aiResponse = await OpenAi(userMessage, systemPrompt);

//       if (aiResponse) {
//         const responseText =
//           aiResponse || "I'm sorry, I couldn't generate a response.";
//         setMessages((prev) => [...prev, { text: responseText, isUser: false }]);
//         speak(responseText);
//       } else {
//         throw new Error("Invalid AI response format");
//       }
//     } catch (error) {
//       console.error("Error getting AI response:", error);
//       const errorMessage =
//         "I'm sorry, I encountered an error. Please try again.";
//       setMessages((prev) => [...prev, { text: errorMessage, isUser: false }]);
//       speak(errorMessage);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (recognitionRef.current) {
//       recognitionRef.current.onresult = (event: any) => {
//         const transcript = event.results[0][0].transcript;
//         setMessages((prev) => [...prev, { text: transcript, isUser: true }]);
//         getAIResponse(transcript);
//       };

//       recognitionRef.current.onend = () => {
//         if (isListening) {
//           recognitionRef.current?.start();
//         }
//       };
//     }
//   }, [isListening]);

//   return (
//     <Card className="w-full max-w-3xl mx-auto ">
//       <CardHeader>
//         <CardTitle className="text-3xl font-bold text-primary">
//           Eduifa Voice Assistant
//         </CardTitle>
//         <CardDescription>
//           Have a conversation with our AI-powered voice assistant
//         </CardDescription>
//       </CardHeader>
//       <CardContent className="p-6">
//         <Alert className="mb-4">
//           <AlertCircle className="h-4 w-4" />
//           <AlertTitle>Please note</AlertTitle>
//           <AlertDescription>
//             There may be a slight delay in audio responses as Eduifa processes
//             your request.
//           </AlertDescription>
//         </Alert>

//         <div className="flex justify-between items-center mb-4">
//           {callStatus === "idle" ? (
//             <Button
//               onClick={startCall}
//               className="bg-green-500 hover:bg-green-600 text-white"
//             >
//               <PhoneCall className="mr-2 h-4 w-4" /> Start Call
//             </Button>
//           ) : (
//             <Button onClick={endCall} variant="destructive">
//               <PhoneOff className="mr-2 h-4 w-4" /> End Call
//             </Button>
//           )}
//         </div>

//         {callStatus === "ringing" && (
//           <div className="text-center py-4 animate-pulse">
//             <p className="text-lg font-semibold">Calling Eduifa...</p>
//             <div className="mt-2 flex justify-center space-x-2">
//               <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
//               <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-100"></div>
//               <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-200"></div>
//             </div>
//           </div>
//         )}

//         {callStatus === "active" && (
//           <>
//             <div className="h-80 overflow-y-auto mb-4 p-4 border rounded-lg bg-gray-50">
//               {messages.map((message, index) => (
//                 <div
//                   key={index}
//                   className={cn(
//                     "mb-2 max-w-[80%] rounded-lg p-3",
//                     message.isUser
//                       ? "ml-auto bg-blue-100 text-blue-900"
//                       : "mr-auto bg-white text-gray-900 shadow"
//                   )}
//                 >
//                   <p className="text-sm font-medium">
//                     {message.isUser ? "You" : "Eduifa"}
//                   </p>
//                   <p>{message.text}</p>
//                 </div>
//               ))}
//               {isLoading && (
//                 <div className="text-center p-2 bg-gray-100 rounded-lg animate-pulse">
//                   <p>Eduifa is thinking...</p>
//                 </div>
//               )}
//               <div ref={messagesEndRef} />
//             </div>
//             <div className="flex space-x-2">
//               <Button
//                 onClick={toggleListening}
//                 className={cn(
//                   "flex-1",
//                   isListening
//                     ? "bg-red-500 hover:bg-red-600"
//                     : "bg-blue-500 hover:bg-blue-600"
//                 )}
//                 disabled={isLoading || isSpeaking}
//               >
//                 {isListening ? (
//                   <>
//                     <MicOff className="mr-2 h-4 w-4" /> Stop Listening
//                   </>
//                 ) : (
//                   <>
//                     <Mic className="mr-2 h-4 w-4" /> Start Listening
//                   </>
//                 )}
//               </Button>
//               {isSpeaking && (
//                 <Button variant="outline" className="animate-pulse">
//                   <Volume2 className="mr-2 h-4 w-4" /> Speaking...
//                 </Button>
//               )}
//             </div>
//           </>
//         )}
//       </CardContent>

//       <Dialog open={showModal} onOpenChange={setShowModal}>
//         <DialogContent className="sm:max-w-[425px]">
//           <DialogHeader>
//             <DialogTitle>
//               {isSpeaking ? "Eduifa is Speaking" : "Your Turn to Speak"}
//             </DialogTitle>
//           </DialogHeader>
//           <div className="flex flex-col items-center justify-center p-4">
//             {isSpeaking ? (
//               <div className="flex items-center justify-center space-x-2">
//                 <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse"></div>
//                 <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse delay-75"></div>
//                 <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse delay-150"></div>
//               </div>
//             ) : (
//               <Button
//                 onClick={toggleListening}
//                 className="mt-4"
//                 disabled={isLoading}
//               >
//                 {isListening ? "Stop Responding" : "Start Speaking"}
//               </Button>
//             )}
//           </div>
//         </DialogContent>
//       </Dialog>
//     </Card>
//   );
// }
