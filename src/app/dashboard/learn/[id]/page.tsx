"use client";

import { useEffect, useState } from "react";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import mdxComponents from "@/components/mdxComponents";
import { useParams, useRouter } from "next/navigation";
import { getUserFromLocalStorage, User } from "@/app/helpers/user";
import { getCourse } from "@/app/helpers/queries";
import { Course } from "@prisma/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export default function LessonModule() {
  const { id } = useParams();
  const router = useRouter();
  const [mdxSources, setMdxSources] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [courseData, setCourseData] = useState<Course | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [currentSection, setCurrentSection] = useState(0);

  async function fetchCourse(courseId: string) {
    setLoading(true);
    const response = await getCourse(courseId);
    if (response.success && response.data) {
      setCourseData(response.data);
      const serializedContents = await Promise.all(
        response?.data.contents.map((content: string) => serialize(content))
      );
      setMdxSources(serializedContents);
    } else {
      toast.error(response.error);
    }
    setLoading(false);
  }

  useEffect(() => {
    const user = getUserFromLocalStorage();
    if (user) {
      setUser(user);
    }
    fetchCourse(id as string);
  }, [id]);

  const handleNext = () => {
    if (currentSection < mdxSources.length - 1) {
      setCurrentSection(currentSection + 1);
    }
  };

  const handlePrevious = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  const handleComplete = async () => {
    toast.success("Course completed!");
    // router.push("/dashboard");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin h-8 w-8 text-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{courseData?.title}</h1>
      {mdxSources.length > 0 ? (
        <>
          <div className="mb-8">
            <MDXRemote
              {...mdxSources[currentSection]}
              components={mdxComponents}
            />
          </div>
          <div className="flex justify-between items-center">
            <Button onClick={handlePrevious} disabled={currentSection === 0}>
              Previous
            </Button>
            {currentSection === mdxSources.length - 1 ? (
              <Button onClick={handleComplete}>Complete Course</Button>
            ) : (
              <Button onClick={handleNext}>Next</Button>
            )}
          </div>
          <div className="mt-4 text-center">
            Section {currentSection + 1} of {mdxSources.length}
          </div>
        </>
      ) : (
        <p>No content available.</p>
      )}
    </div>
  );
}
