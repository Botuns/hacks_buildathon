"use server";
import { db } from "@/lib/db";

//  function for error logging
const logError = (functionName: string, error: any) => {
  console.error(`Error in ${functionName}:`, error);
};

export async function markCourseAsCompleted(courseId: string, userId: string) {
  try {
    const isCourseExist = await db.course.findUnique({
      where: { id: courseId },
    });
    if (!isCourseExist) {
      return { success: false, error: "Course not found", data: null };
    }

    const isUserExist = await db.user.findUnique({
      where: { id: userId },
    });
    if (!isUserExist) {
      return { success: false, error: "User not found", data: null };
    }

    if (isCourseExist.isCompleted) {
      return { success: false, error: "Course already completed", data: null };
    }

    const updatedCourse = await db.course.update({
      where: { id: courseId },
      data: { isCompleted: true },
    });

    return { success: true, error: null, data: updatedCourse };
  } catch (error: any) {
    logError("markCourseAsCompleted", error);
    return {
      success: false,
      error: `${"An unexpected error occurred" + error.message}`,
      data: null,
    };
  }
}

export async function getUserCourses(userId: string) {
  try {
    const user = await db.user.findUnique({
      where: { id: userId },
      include: { generatedCourses: true },
    });

    if (!user) {
      return { success: false, error: "User not found", data: null };
    }

    return { success: true, error: null, data: user.generatedCourses };
  } catch (error: any) {
    logError("getUserCourses", error);
    return {
      success: false,
      error: `${"An unexpected error occurred" + error.message}`,
      data: null,
    };
  }
}

export async function getCourse(courseId: string) {
  try {
    const course = await db.course.findUnique({
      where: { id: courseId },
    });

    if (!course) {
      return { success: false, error: "Course not found", data: null };
    }

    return { success: true, error: null, data: course };
  } catch (error) {
    logError("getCourse", error);
    return {
      success: false,
      error: "An unexpected error occurred",
      data: null,
    };
  }
}
