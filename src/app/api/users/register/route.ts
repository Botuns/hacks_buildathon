import { NextResponse } from "next/server";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { db } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const {
      fullName,
      email,
      password,
      class: userClass,
    } = await request.json();

    if (!fullName || !email || !password) {
      return NextResponse.json(
        { message: "Full name, email, and password are required." },
        { status: 400 }
      );
    }

    const user = await db.user.create({
      data: {
        fullName,
        email,
        password,
        class: userClass || "Not Applicable",
      },
    });

    return NextResponse.json(
      { message: "User created successfully", user: user },
      { status: 201 }
    );
  } catch (error: any) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return NextResponse.json(
          { message: "A user with this email already exists." },
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
