import { getHumeAccessToken } from "@/lib/getHumeAccessToken";
import dynamic from "next/dynamic";
import { Suspense, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const VoiceCodersAscent = dynamic(() => import("./index"), {
  ssr: false,
});

function HelpDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <HelpCircle className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>How to Play Voice Coder&apos;s Ascent</DialogTitle>
          <DialogDescription>
            Learn the rules and mechanics of the game.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 space-y-4">
          <p>
            <strong>Objective:</strong> Reach the top of the 25-square board by
            answering questions correctly.
          </p>
          <p>
            <strong>Time Limit:</strong> You have 60 seconds to complete the
            game.
          </p>
          <p>
            <strong>Gameplay:</strong>
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              Answer questions related to math, English, or coding using your
              voice.
            </li>
            <li>Correct answers move you forward 1-3 spaces randomly.</li>
            <li>Land on a ladder to climb up, or a snake to slide down.</li>
            <li>
              Incorrect answers don&apos;t move you, but you get a new question.
            </li>
          </ul>
          <p>
            <strong>Voice Controls:</strong> Use the microphone toggle to
            mute/unmute. Speak clearly when answering.
          </p>
          <p>
            <strong>Winning:</strong> Reach or pass square 25, or answer as many
            questions as possible before time runs out.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default async function Page() {
  //   let accessToken: string | null = null;
  let error: string | null = null;

  //   try {
  //     accessToken = await getHumeAccessToken();
  //   } catch (e) {
  //     console.error("Failed to get Hume access token:", e);
  //     error = "Failed to initialize the game. Please try again later.";
  //   }

  //   if (!accessToken) {
  //     console.error("No Hume access token received");
  //     error =
  //       error ||
  //       "Unable to start the game. Please check your connection and try again.";
  //   }

  return (
    <div className="grow flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl relative">
        <div className="absolute top-4 right-4 z-10">
          <HelpDialog />
        </div>
        {error ? (
          <Alert variant="destructive" className="max-w-md mx-auto">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : (
          <Suspense
            fallback={
              <div className="flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin" />
                <span className="ml-2">Loading game...</span>
              </div>
            }
          >
            <VoiceCodersAscent />
          </Suspense>
        )}
      </div>
    </div>
  );
}
