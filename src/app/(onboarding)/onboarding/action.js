"use server";

import checkSession from "@/libs/check-session";
import { prisma } from "@/utils/prisma";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function selectTopicsAction(selectedTopics) {
  const cookieStore = await cookies();
  const session = await checkSession();

  if (!session.isLoggedIn) {
    const topics = selectedTopics.map((topic) => {
      return {
        id: topic.id,
        name: topic.name,
      };
    });

    cookieStore.set("topics", JSON.stringify(topics));
  }

  if (session.isLoggedIn) {
    const topics = selectedTopics.map((topic) => {
      return {
        userId: session.data.userId,
        preferenceId: topic.id,
      };
    });

    await prisma.userPreference.createMany({
      data: topics,
      skipDuplicates: true,
    });
    await prisma.user.update({
      where: {
        id: session.data?.userId,
      },
      data: {
        hasCompletedOnboarding: true,
      },
    });
  }

  redirect("/");
}
