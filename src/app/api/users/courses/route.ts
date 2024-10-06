import { NextResponse } from "next/server";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { db } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const {
      title,
      contents,
      userId,
      numberOfSections,
    } = await request.json();

    if (!title || !contents || !userId) {
      return NextResponse.json(
        { message: "Title, contents, and user ID are required." },
        { status: 400 }
      );
    }

    const course = await db.course.create({
      data: {
        title,
        contents,
        userId,
        numberOfSections: numberOfSections || contents.length,
        isCompleted: false, 
        currentProgress: 0, 
      },
    });

    return NextResponse.json(
      { message: "Course created successfully", course },
      { status: 201 }
    );
  } catch (error: any) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return NextResponse.json(
          { message: "A course with this title already exists." },
          { status: 400 }
        );
      } else if (error.code === "P2025") {
        return NextResponse.json(
          { message: "Record not found." },
          { status: 404 }
        );
      }
      return NextResponse.json(
        { message: "Database error", details: error.message },
        { status: 500 }
      );
    }

    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { message: "Invalid JSON format in request." },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "An unexpected error occurred.", details: error.message },
      { status: 500 }
    );
  }
}
