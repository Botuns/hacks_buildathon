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
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { getUserCourses } from "../helpers/queries";
import { Course } from "@prisma/client";
import { getUserFromLocalStorage } from "../helpers/user";
import { StatsCard } from "@/components/stats-card";
import { ActionButtonGrid } from "@/components/actions";
import CourseCard from "@/components/course-card";

export default function DashboardBody() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 3;
  const totalPages = Math.ceil(courses.length / coursesPerPage);

  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);

  const nextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const prevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  // function Navigate(url: string) {
  //   router.push(url);
  // }

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

  // const navigateToCourse = (courseId: string) => {
  //   router.push(`/dashboard/learn/${courseId}`);
  // };
  const completedCourses = courses.filter(
    (course) => course.currentProgress === course.numberOfSections
  ).length;

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
    <div className="container mx-auto p-8  space-y-8 py-0">
      <h1 className="text-2xl font-bold">Your Learning Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard
          title="Total Courses"
          value={courses.length}
          icon="book"
          variant="green"
        />
        <StatsCard
          title="Completed Courses"
          value={completedCourses}
          icon="trophy"
          variant="blue"
        />
        <StatsCard
          title="Overall Progress"
          value={overallProgress}
          showAsProgress={true}
          icon="none"
          variant="purple"
        />
      </div>
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">AI-Powered Features</h2>
        <ActionButtonGrid />
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
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
            <div className="flex justify-between items-center">
              <Button
                variant="outline"
                onClick={prevPage}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                onClick={nextPage}
                disabled={currentPage === totalPages}
              >
                Next
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
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
