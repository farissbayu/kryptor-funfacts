"use server";

import { prisma } from "@/utils/prisma";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function registerAction(_, formData) {
  const cookieStore = await cookies();
  if (cookieStore.has("topics")) {
    cookieStore.delete("topics");
  }

  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");

  if (!name || !email || !password) {
    return {
      status: false,
      message: "Please Fill All Form!",
    };
  }

  const isExists = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (isExists) {
    return {
      status: false,
      message: "Email Already Registered!",
    };
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await prisma.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  const session = await prisma.session.create({
    data: {
      userId: newUser.id,
    },
  });
  cookieStore.set("sessionId", session.id, {
    httpOnly: true,
    sameSite: true,
    secure: process.env.NODE_ENV === "production",
  });

  redirect("/onboarding");
}
