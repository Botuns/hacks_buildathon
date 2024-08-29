import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
// import bcrypt from 'bcryptjs'

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const {
      fullName,
      email,
      password,
      class: userClass,
    } = await request.json();

    // Hash the password
    // const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
      data: {
        fullName,
        email,
        password: password,
        class: userClass || "Not Applicable",
      },
    });

    return NextResponse.json(
      { message: "User created successfully", userId: user.id },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: "Error creating user", error: error.message },
      { status: 400 }
    );
  }
}
