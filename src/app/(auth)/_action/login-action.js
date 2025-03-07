"use server";

import { prisma } from "@/utils/prisma";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function loginAction(_, formData) {
  const cookieStore = await cookies();
  if (cookieStore.has("topics")) {
    cookieStore.delete("topics");
  }

  const email = formData.get("email");
  const password = formData.get("password");

  if (!email || !password) {
    return {
      status: false,
      message: "All fields are required!",
    };
  }

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    return {
      status: false,
      message: "User not found!",
    };
  }

  const isPasswordMatched = await bcrypt.compare(password, user.password);
  if (!isPasswordMatched) {
    return {
      status: false,
      message: "Wrong password!",
    };
  }

  const session = await prisma.session.create({
    data: {
      userId: user.id,
    },
  });

  cookieStore.set("sessionId", session.id, {
    httpOnly: true,
    sameSite: true,
    secure: process.env.NODE_ENV === "production",
  });

  redirect("/");
}
