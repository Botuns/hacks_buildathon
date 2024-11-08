"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Book, CheckCircle2, Clock, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

// Helper function to resolve icon component
const getIcon = (icon: "book" | "trophy" | "clock" | "check" | "none") => {
  const icons = {
    book: Book,
    trophy: Trophy,
    clock: Clock,
    check: CheckCircle2,
  };
  const IconComponent = icon !== "none" ? icons[icon] : null;
  return IconComponent ? (
    <div className="rounded-full bg-white/25 p-2">
      <IconComponent className="h-4 w-4 text-white" />
    </div>
  ) : null;
};

interface StatsCardProps {
  title: string;
  value: number;
  icon: "book" | "trophy" | "clock" | "check" | "none";
  showAsProgress?: boolean;
  variant?: "green" | "blue" | "purple";
}

export function StatsCard({
  title = "Completed Courses",
  value = 100,
  icon = "check",
  showAsProgress = false,
  variant = "green",
}: StatsCardProps) {
  const variants = {
    green: "bg-gradient-to-br from-emerald-400 to-emerald-600",
    blue: "bg-gradient-to-br from-blue-400 to-blue-600",
    purple: "bg-gradient-to-br from-purple-400 to-purple-600",
  };

  return (
    <Card
      className={cn(
        "border-none shadow transition-transform hover:scale-105",
        variants[variant]
      )}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-white/90">
          {title}
        </CardTitle>
        {showAsProgress ? (
          <Progress
            value={value}
            className="w-[60px] bg-white/20"
            // indic="bg-white"
          />
        ) : (
          getIcon(icon)
        )}
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline gap-1">
          <div className="text-3xl font-bold text-white">
            {value}
            <span className="text-xl">+</span>
          </div>
        </div>
        <p className="text-sm mt-1 text-white/80">{title.toUpperCase()}</p>
      </CardContent>
    </Card>
  );
}
