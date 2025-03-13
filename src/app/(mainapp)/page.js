import checkSession from "@/libs/check-session";
import { prisma } from "@/utils/prisma";
import React from "react";
import ContentFeed from "./_components/contentFeed";
import { cookies } from "next/headers";

export default async function Page() {
  const cookieStore = await cookies();
  const session = await checkSession();

  let topics = [];
  let bookmarkedSet = new Set();

  if (!session.isLoggedIn) {
    const cookiesTopics = cookieStore.get("topics")?.value;
    const parsedTopics = cookiesTopics && JSON.parse(cookiesTopics);
    topics = parsedTopics.map((topic) => {
      return { id: topic.id, name: topic.name };
    });
  }

  if (session.isLoggedIn) {
    const bookmark = await prisma.bookmark.findMany({
      where: {
        userId: session.data.userId,
      },
      select: {
        factId: true,
      },
    });
    bookmarkedSet = new Set(bookmark.map((b) => b.factId));

    const userPreferences = await prisma.userPreference.findMany({
      where: {
        userId: session.data.userId,
      },
      select: {
        preference: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    topics = userPreferences.map((preference) => {
      return { id: preference.preference.id, name: preference.preference.name };
    });
  }

  return (
    <div className="h-screen block">
      <ContentFeed
        userTopics={topics}
        session={session}
        bookmark={bookmarkedSet}
      />
    </div>
  );
}
