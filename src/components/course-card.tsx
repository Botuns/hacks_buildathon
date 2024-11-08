import React from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import Image from "next/image";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { Progress } from "./ui/progress";
import { Book, Clock, FileText, Users } from "lucide-react";

type Course = {
  id: string;
  title: string;
  currentProgress: number;
  numberOfSections: number;
};

type Props = {
  course: Course;
};

export default function CourseCard({ course }: Props) {
  const router = useRouter();
  const navigateToCourse = (courseId: string) => {
    router.push(`/dashboard/learn/${courseId}`);
  };

  const progressPercentage =
    (course.currentProgress / course.numberOfSections) * 100;

  return (
    <Card
      key={course.id}
      className="overflow-hidden hover:shadow-lg transition-all duration-300 bg-card/50"
      onClick={() => navigateToCourse(course.id)}
    >
      <div className="p-6 space-y-6">
        <div className="flex items-start gap-4">
          <div className="relative shrink-0">
            <div className="absolute inset-0 rounded-full border-4 border-primary" />
            <CircularProgress progress={progressPercentage} />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-2 line-clamp-1">
              {course.title}
            </h3>
            <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground text-xs">
              <div className="flex items-center gap-1.5 text-xs">
                <Book className="w-4 h-4" />
                <span> {progressPercentage.toFixed(0)}% completed</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                <span>50 min</span>
              </div>
              <div className="flex items-center gap-1.5">
                <FileText className="w-4 h-4" />
                <span>{course.numberOfSections} sections</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Users className="w-4 h-4" />
                <span>100% AI</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="text-3xl font-bold text-primary">
            {progressPercentage.toFixed(0)}%
          </div>
          <div className="flex gap-3 flex-1">
            <Button
              variant="outline"
              size={"sm"}
              className="flex-1 bg-background hover:bg-background rounded-full"
            >
              Skip
            </Button>
            <Button className="flex-1 rounded-full" size={"sm"}>
              Continue
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}

const CircularProgress = ({
  progress = 0,
  size = 60,
  strokeWidth = 4,
  className = "",
}: {
  progress: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
}) => {
  const normalizedProgress = Math.min(100, Math.max(0, progress));

  const center = size / 2;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset =
    circumference - (normalizedProgress / 100) * circumference;

  return (
    <div
      className={`relative ${className}`}
      style={{ width: size, height: size }}
    >
      <svg className="w-full h-full transform -rotate-90">
        <circle
          className="text-gray-200"
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={center}
          cy={center}
        />
        <circle
          className="text-primary"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={center}
          cy={center}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-sm font-medium">
          {Math.round(normalizedProgress)}%
        </span>
      </div>
    </div>
  );
};
