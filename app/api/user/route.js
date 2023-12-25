import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const POST = async (req, res) => {
  const body = await req.json();

  try {
    // Check for existing user
    const existingUser = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });

    if (!existingUser) {
      // Register new user
      const newUser = await prisma.user.create({
        data: {
          email: body.email,
          name: body.name,
        },
      });

      return NextResponse.json({ data: newUser }, { status: 201 });
    } else {
      console.log("Sending response:", { message: existingUser });
      return NextResponse.json({ message: existingUser }, { status: 200 });
    }
  } catch (error) {
    console.error("Error handling user registration:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
