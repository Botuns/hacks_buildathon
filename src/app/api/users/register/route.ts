import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export async function POST(request: Request) {
  try {
    const {
      fullName,
      email,
      password,
      class: userClass,
    } = await request.json();

    // Basic validation
    if (!fullName || !email || !password) {
      return NextResponse.json(
        { message: "Full name, email, and password are required." },
        { status: 400 } // Bad Request
      );
    }

    // Create user in the database
    const user = await prisma.user.create({
      data: {
        fullName,
        email,
        password,
        class: userClass || "Not Applicable",
      },
    });

    return NextResponse.json(
      { message: "User created successfully", user: user },
      { status: 201 } // Created
    );
  } catch (error:any) {
    if (error instanceof PrismaClientKnownRequestError) {
      // Handle specific Prisma errors
      if (error.code === "P2002") {
        // Unique constraint violation
        return NextResponse.json(
          { message: "A user with this email already exists." },
          { status: 409 } // Conflict
        );
      } else if (error.code === "P2025") {
        // Record not found
        return NextResponse.json(
          { message: "Record not found." },
          { status: 404 } // Not Found
        );
      }
      // Handle other Prisma errors
      return NextResponse.json(
        { message: "Database error", details: error.message },
        { status: 500 } // Internal Server Error
      );
    }

    // Handle validation and operational errors
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { message: "Invalid JSON format in request." },
        { status: 400 } // Bad Request
      );
    }

    // Handle unexpected errors
    return NextResponse.json(
      { message: "An unexpected error occurred.", details: error.message },
      { status: 500 } // Internal Server Error
    );
  }
}
