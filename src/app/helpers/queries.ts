"use server";
// queries to mark courses as completed
export async function markCourseAsCompleted(courseId: string, userId: string) {
  const isCourseExist = await prisma?.course.findUnique({
    where: {
      id: courseId,
    },
  });
  if (!isCourseExist) {
    return {
      success: false,
      error: "Course not found",
      data: null,
    };
  }
  const isUserExist = await prisma?.user.findUnique({
    where: {
      id: userId,
    },
  });
  if (!isUserExist) {
    return {
      success: false,
      error: "User not found",
      data: null,
    };
  }
  const isCourseCompleted = isCourseExist.isCompleted;
  if (isCourseCompleted) {
    return {
      success: false,
      error: "Course already completed",
      data: null,
    };
  }
  const updatedCourse = await prisma?.course.update({
    where: {
      id: courseId,
    },
    data: {
      isCompleted: true,
    },
  });
  if (!updatedCourse) {
    return {
      success: false,
      error: "Failed to update course",
      data: null,
    };
  }
  return {
    success: true,
    error: null,
    data: updatedCourse,
  };
}
// get users courses

export async function getUserCourses(userId: string) {
  const user = await prisma?.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      generatedCourses: true,
    },
  });
  if (!user) {
    return {
      success: false,
      error: "User not found",
      data: null,
    };
  }
  return {
    success: true,
    error: null,
    data: user.generatedCourses,
  };
}

// get course
export async function getCourse(courseId: string) {
  const course = await prisma?.course.findUnique({
    where: {
      id: courseId,
    },
  });
  if (!course) {
    return {
      success: false,
      error: "Course not found",
      data: null,
    };
  }
  return {
    success: true,
    error: null,
    data: course,
  };
}
