"use server";

import checkSession from "@/libs/check-session";
import FetchFact from "@/libs/fetch-fact";
import { openai } from "@/utils/openai";
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
    console.log(topics[0].name, topics[1].name, topics[2].name);

    cookieStore.set("topics", JSON.stringify(topics));
    await FetchFact(topics);
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
    const userId = session.data.userId;
    await FetchFact(topics, userId);
  }

  redirect("/");
}
