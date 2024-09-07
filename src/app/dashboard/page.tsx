"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  Loader2,
  Mic,
  MessageSquare,
  FileText,
  Book,
  Trophy,
  Settings,
  HelpCircle,
} from "lucide-react";
import { getUserCourses } from "../helpers/queries";
import { Course } from "@prisma/client";

// type Course = {
//   id: string;
//   title: string;
//   currentProgress: number;
//   numberOfSections: number;
// };

export default function Dashboard() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  useEffect(() => {
    async function fetchCourses() {
      setLoading(true);
      try {
        const userId = "e01ef169-0248-436b-a4fd-6a53c78e5990";
        const response = await getUserCourses(userId);
        if (response.success && response.data) {
          setCourses(response.data);
        } else {
          console.error(response.error);
        }
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      }
      setLoading(false);
    }

    fetchCourses();
  }, []);

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const navigateToCourse = (courseId: string) => {
    router.push(`/dashboard/learn/${courseId}`);
  };

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-8">
        Welcome to Your Learning Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
            <Book className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{courses.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Completed Courses
            </CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {
                courses.filter(
                  (course) => course.currentProgress === course.numberOfSections
                ).length
              }
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Overall Progress
            </CardTitle>
            <Progress value={33} className="w-[60px]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">33%</div>
          </CardContent>
        </Card>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">AI-Powered Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <Button className="h-24 flex flex-col items-center justify-center space-y-2">
            <Mic className="h-6 w-6" />
            <span>Voice Call with AI</span>
          </Button>
          <Button className="h-24 flex flex-col items-center justify-center space-y-2">
            <MessageSquare className="h-6 w-6" />
            <span>Chat with AI</span>
          </Button>
          <Button className="h-24 flex flex-col items-center justify-center space-y-2">
            <FileText className="h-6 w-6" />
            <span>Chat with PDF</span>
          </Button>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Your Recent Courses</h2>
        <Input
          type="text"
          placeholder="Search courses..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-4"
        />
        {loading ? (
          <div className="flex justify-center items-center h-32">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <Card
                key={course.id}
                className="cursor-pointer hover:shadow-lg transition-shadow duration-300"
                onClick={() => navigateToCourse(course.id)}
              >
                <CardHeader>
                  <CardTitle>{course.title}</CardTitle>
                  <CardDescription>
                    Progress: {course.currentProgress} /{" "}
                    {course.numberOfSections} sections
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Progress
                    value={
                      (course.currentProgress / course.numberOfSections) * 100
                    }
                    className="mb-2"
                  />
                  <Button className="w-full">Continue Learning</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <div className="mt-12 flex justify-between items-center">
        <Button variant="outline" className="flex items-center space-x-2">
          <Settings className="h-4 w-4" />
          <span>Settings</span>
        </Button>
        <Button variant="outline" className="flex items-center space-x-2">
          <HelpCircle className="h-4 w-4" />
          <span>Help & Support</span>
        </Button>
      </div>
    </div>
  );
}
