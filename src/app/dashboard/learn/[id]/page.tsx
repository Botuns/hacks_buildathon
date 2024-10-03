"use client";

import { useEffect, useState } from "react";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import mdxComponents from "@/components/mdxComponents";
import { useParams, useRouter } from "next/navigation";
import { getUserFromLocalStorage, User } from "@/app/helpers/user";
import {
  getCourse,
  markCourseAsCompleted,
  setCourseProgress,
} from "@/app/helpers/queries";
import { Course } from "@prisma/client";
import { toast, Toaster } from "sonner";
import { Button } from "@/components/ui/button";
import { Loader2, BookOpen, Mic, Trophy } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

export default function ImprovedLessonModule() {
  const { id } = useParams();
  const router = useRouter();
  const [mdxSources, setMdxSources] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [courseData, setCourseData] = useState<Course | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [currentSection, setCurrentSection] = useState(0);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [isCopleting, setIsCompleting] = useState(false);

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

  const handleNext = async () => {
    if (currentSection < mdxSources.length - 1) {
      setCurrentSection(currentSection + 1);
      await setCourseProgress(
        id as string,
        user?.id as string,
        currentSection + 1
      );
    }
  };

  const handlePrevious = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  const handleComplete = async () => {
    await mark_CourseAsCompleted();
    setShowCompletionModal(true);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  const mark_CourseAsCompleted = async () => {
    setIsCompleting(true);
    try {
      const response = await markCourseAsCompleted(
        id as string,
        user?.id as string
      );
      if (response.success) {
        toast.success("Course completed!");
      } else {
        toast.error(response.error);
      }
    } catch (error: any) {
      toast.error("An unexpected error occurred");
    } finally {
      setIsCompleting(false);
    }
  };

  const handleViewOtherCourses = () => {
    router.push("/dashboard");
  };

  const handleVoiceConversation = () => {
    router.push(`/dashboard/call`);
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
      <Toaster richColors />
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
              <Button onClick={handleComplete} disabled={isCopleting}>
                {isCopleting ? (
                  <Loader2 className="animate-spin h-4 w-4" />
                ) : (
                  "Complete Course"
                )}
              </Button>
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

      <AnimatePresence>
        {showCompletionModal && (
          <Dialog
            open={showCompletionModal}
            onOpenChange={setShowCompletionModal}
          >
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-center flex items-center justify-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  >
                    <Trophy className="w-12 h-12 text-yellow-400 mr-2" />
                  </motion.div>
                  Congratulations! 🎉
                </DialogTitle>
                <DialogDescription className="text-center text-lg">
                  You&apos;ve successfully completed the course!
                </DialogDescription>
              </DialogHeader>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex flex-col space-y-4"
              >
                <p className="text-center">What would you like to do next?</p>
                <Button onClick={handleViewOtherCourses} className="w-full">
                  <BookOpen className="mr-2 h-4 w-4" />
                  View Other Courses
                </Button>
                <Button onClick={handleVoiceConversation} className="w-full">
                  <Mic className="mr-2 h-4 w-4" />
                  Discuss This Course
                </Button>
              </motion.div>
              <DialogFooter className="sm:justify-start">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setShowCompletionModal(false)}
                >
                  Close
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </div>
  );
}
