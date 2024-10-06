import { Card } from "@/components/ui/card";
import Link from "next/link";

export default function LearnFormHeader() {
  return (
    <Card className="bg-gradient-to-br from-[#6D5BF6] to-[#1350e0] p-3 rounded-xl  mb-[3rem]">
      <div className="flex items-center gap-4">
        <div className="bg-white/20 rounded-full p-3 flex items-center justify-center">
          <BotIcon className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-white">
          AI-Powered Course/Knowlegde Module Generator 🤖
        </h2>
      </div>
      <p className="text-white/80 mt-4">
        Discover your perfect knowledge acquisition with our AI-powered course
        generation engine. Get personalized course content tailored to your
        goals and interests. Your learning progress is saved and you can pick up
        from where you left off.
      </p>
    </Card>
  );
}

function BotIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 8V4H8" />
      <rect width="16" height="12" x="4" y="8" rx="2" />
      <path d="M2 14h2" />
      <path d="M20 14h2" />
      <path d="M15 13v2" />
      <path d="M9 13v2" />
    </svg>
  );
}
