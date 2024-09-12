"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  Search,
} from "lucide-react";
import { getUserCourses } from "../helpers/queries";
import { Course } from "@prisma/client";
import { getUserFromLocalStorage } from "../helpers/user";

export default function DashboardBody() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  function Navigate(url: string) {
    router.push(url);
  }

  useEffect(() => {
    async function fetchCourses() {
      setLoading(true);
      try {
        // const userId = "e01ef169-0248-436b-a4fd-6a53c78e5990";
        // const { user } = useUser();
        const user = getUserFromLocalStorage();
        // @ts-ignore
        const response = await getUserCourses(user.id ?? "");
        console.log("response", response);
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

  const overallProgress =
    courses.length > 0
      ? Math.round(
          (courses.reduce(
            (sum, course) =>
              sum + course.currentProgress / course.numberOfSections,
            0
          ) /
            courses.length) *
            100
        )
      : 0;

  return (
    <div className="container mx-auto p-8 space-y-8">
      <h1 className="text-4xl font-bold">Your Learning Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-primary">
              Total Courses
            </CardTitle>
            <Book className="h-4 w-4 text-muted-foreground text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{courses.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-primary">
              Completed Courses
            </CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground text-primary" />
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
            <CardTitle className="text-sm font-medium text-primary">
              Overall Progress
            </CardTitle>
            <Progress value={overallProgress} className="w-[60px]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overallProgress}%</div>
          </CardContent>
        </Card>
      </div>
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">AI-Powered Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <Button
            variant="outline"
            className="h-24 flex flex-col items-center justify-center space-y-2"
            onClick={() => Navigate("/dashboard/call")}
          >
            <Mic className="h-6 w-6 text-primary" />
            <span>Voice Call with AI</span>
          </Button>
          <Button
            variant="outline"
            className="h-24 flex flex-col items-center justify-center space-y-2"
            onClick={() => Navigate("/dashboard/chat")}
          >
            <MessageSquare className="h-6 w-6 text-primary" />
            <span>Chat with AI</span>
          </Button>
          <Button
            variant="outline"
            className="h-24 flex flex-col items-center justify-center space-y-2"
            onClick={() => Navigate("/dashboard/chat-with-pdf")}
          >
            <FileText className="h-6 w-6 text-primary" />
            <span>Chat with PDF</span>
          </Button>
        </div>
      </div>
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Your Recent Courses</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        {loading ? (
          <div className="flex justify-center items-center h-32">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <Card
                key={course.id}
                className="overflow-hidden hover:shadow-lg transition-shadow duration-300"
                onClick={() => navigateToCourse(course.id)}
              >
                <Image
                  src={
                    "https://img.freepik.com/free-vector/abstract-organic-pattern-design-background_1048-19286.jpg"
                  }
                  alt={course.title}
                  width={400}
                  height={200}
                  className="w-full h-48 object-cover"
                />
                <CardHeader>
                  <CardTitle className="line-clamp-1">{course.title}</CardTitle>
                  <CardDescription>
                    Progress: {course.currentProgress} /{" "}
                    {course.numberOfSections} sections
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Progress
                    value={
                      (course.currentProgress / course.numberOfSections) * 100
                    }
                    className="w-full"
                  />
                  <Button className="w-full">Continue Learning</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
        {filteredCourses.length === 0 && (
          <div className="text-center text-muted-foreground">
            No courses found. 
          </div>
        )}
      </div>
      <div className="flex justify-between items-center">
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
