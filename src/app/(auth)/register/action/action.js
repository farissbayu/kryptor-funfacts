"use server";

import { prisma } from "@/utils/prisma";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

export default async function registerAction(_, formData) {
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
  await prisma.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  redirect("/");
}
