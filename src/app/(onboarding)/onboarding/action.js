"use server";

import checkSession from "@/libs/check-session";
import generateFact from "@/libs/generate-fact";
import { prisma } from "@/utils/prisma";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function selectTopicsAction(selectedTopics) {
  const cookieStore = await cookies();
  const session = await checkSession();

  const topics = selectedTopics.map((topic) => {
    return {
      id: topic.id,
      name: topic.name,
    };
  });

  if (!session.isLoggedIn) {
    cookieStore.set("topics", JSON.stringify(topics));
    await generateFact(topics);
  }

  if (session.isLoggedIn) {
    const topicsForDB = selectedTopics.map((topic) => {
      return {
        userId: session.data.userId,
        preferenceId: topic.id,
      };
    });

    // save user preference to database
    await prisma.userPreference.createMany({
      data: topicsForDB,
      skipDuplicates: true,
    });

    // update user that completed onboarding
    await prisma.user.update({
      where: {
        id: session.data?.userId,
      },
      data: {
        hasCompletedOnboarding: true,
      },
    });

    const userId = session.data.userId;
    await generateFact(topics, userId);
  }

  redirect("/");
}
