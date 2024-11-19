import { useExamStore } from "@/app/hooks/providers/examStore";
import { useEffect, useState } from "react";

export function Timer() {
  const { getRemainingTime, finishExam } = useExamStore();
  const [remainingTime, setRemainingTime] = useState(getRemainingTime());

  useEffect(() => {
    const timer = setInterval(() => {
      const newRemainingTime = getRemainingTime();
      setRemainingTime(newRemainingTime);
      if (newRemainingTime <= 0) {
        clearInterval(timer);
        finishExam();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [getRemainingTime, finishExam]);

  const minutes = Math.floor(remainingTime / 60);
  const seconds = Math.floor(remainingTime % 60);

  return (
    <div className="text-lg font-semibold text-red-500">
      Time Remaining: {minutes.toString().padStart(2, "0")}:
      {seconds.toString().padStart(2, "0")}
    </div>
  );
}
