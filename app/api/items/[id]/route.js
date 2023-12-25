import { PrismaClient } from "@prisma/client";
import { stat } from "fs";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req, { params }) {
  const userID = Number(params.id);
  try {
    if (!userID) {
      return res.status(400).json({ message: "Missing user ID" });
    }

    const listItems = await prisma.listItem.findMany({
      where: {
        userId: userID,
      },
    });

    return NextResponse.json({ message: listItems }, { status: 200 });
  } catch (error) {
    console.error("Error handling list item retrieval:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
  try {
    const userID = Number(params.id);
    const body = await req.json();
    const { status } = body;

    const updatedTask = await prisma.listItem.update({
      where: {
        id: userID,
      },
      data: {
        status: status,
      },
    });

    return NextResponse.json({ message: updatedTask }, { status: 200 });
  } catch (error) {
    console.error("Error handling list item retrieval:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    const taskID = Number(params.id);

    const updatedTask = await prisma.listItem.delete({
      where: {
        id: taskID,
      },
    });

    return NextResponse.json({ message: updatedTask }, { status: 200 });
  } catch (error) {
    console.error("Error handling list item retrieval:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req, { params }) {
  const userID = Number(params.id);
  try {
    const body = await req.json();

    if (!body.userId) {
      return NextResponse.json({ message: "Missing User ID" }, { status: 400 });
    }

    const { name, status, id } = body;

    const newListItem = await prisma.listItem.create({
      data: {
        id,
        userId: userID,
        name,
        status,
      },
    });

    return NextResponse.json({ message: newListItem }, { status: 200 });
  } catch (error) {
    console.error("Error handling list item creation:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
