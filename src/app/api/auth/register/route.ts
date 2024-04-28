import { prisma } from "@/lib/prisma";
import type { NextRequest } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return new Response(
      JSON.stringify({ error: "Email and password are required" }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  const userId = await registerUser(email, password);

  if (!userId) {
    return new Response(JSON.stringify({ error: "Failed to create user" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  return new Response(
    JSON.stringify({ message: "User registered successfully", userId }),
    {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}

async function registerUser(
  email: string,
  password: string
): Promise<number | null> {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = await prisma.user.create({
      data: {
        email,
        first_name: "",
        last_name: "",
        password: hashedPassword,
      },
    });

    return user.id;
  } catch (error) {
    console.error("Failed to register user:", error);
    return null;
  }
}
