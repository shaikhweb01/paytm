"use server";

import { db } from "@repo/orm";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import crypto from "crypto";

export async function createOnRampTransaction(
  provider: string,
  amount: number
) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return { message: "Unauthenticated request" };
  }

  if (!provider || amount <= 0) {
    return { message: "Invalid input" };
  }

  const userId = Number(session.user.id);
  if (isNaN(userId)) {
    return { message: "Invalid user" };
  }

  const token = crypto.randomUUID();

  try {
    await db.onRampTransaction.create({
      data: {
        provider,
        status: "Processing",
        startTime: new Date(),
        token,
        userId,
        amount: amount * 100, // paise
      },
    });

    return {
      message: "Transaction created",
      token,
    };
  } catch (error) {
    console.error("Create onRamp error:", error);
    return { message: "Something went wrong" };
  }
}
