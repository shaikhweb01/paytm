import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@repo/orm";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("SIGNUP BODY 👉", body);

    const { name,email, username, password } = body;

    if (!name ||!email || !username || !password) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    const existingUser = await db.user.findUnique({
      where: { username },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "Username already exists" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("HASHED PASSWORD OK");

    await db.user.create({
      data: {
        name,
        email,
        username,

        password: hashedPassword,
      },
    });

    return NextResponse.json(
      { message: "User created successfully" },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("SIGNUP ERROR ❌", error);

    return NextResponse.json(
      {
        message: "Internal Server Error",
        error: error?.message,
      },
      { status: 500 }
    );
  }
}
