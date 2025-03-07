"use server";

import { prisma } from "@/utils/prisma";
import { cookies } from "next/headers";

export default async function checkSession() {
  const cookiesStore = await cookies();
  const sessionId = cookiesStore.get("sessionId")?.value;

  if (sessionId) {
    const session = await prisma.session.findUnique({
      where: {
        id: sessionId,
      },
      include: {
        user: true,
      },
    });

    if (session) {
      return {
        data: session,
        isLoggedIn: true,
      };
    }
  }

  return {
    data: {},
    isLoggedIn: false,
  };
}
