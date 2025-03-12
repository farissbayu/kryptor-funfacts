import IconBookmarkBlack from "@/components/icon/icon-bookmark-black";
import IconBookmarkWhite from "@/components/icon/icon-bookmark-white";
import checkSession from "@/libs/check-session";
import { prisma } from "@/utils/prisma";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
} from "@heroui/react";
import Link from "next/link";
import React from "react";
import ContentFeed from "./_components/contentFeed";
import { cookies } from "next/headers";
import { getFacts } from "@/libs/get-facts";

export default async function Page() {
  const cookieStore = await cookies();
  const session = await checkSession();

  // topics diubah menjadi array
  // const topics = cookieStore.get("topics")?.value;
  // const parsedTopics = topics ? JSON.parse(topics) : [];
  // const topicMap = parsedTopics.map((topic) => topic.name);

  // if (!session) {
  //   const data = await prisma.fact.findMany({
  //     where: {
  //       preferenceId: {
  //         in: topicMap,
  //       },
  //     },
  //   });
  //   return (
  //     <div className="h-screen block">
  //       <ContentFeed data={data} session={session} />
  //     </div>
  //   );
  // } else {
  // }
  const bookmark = await prisma.bookmark.findMany({
    where: {
      userId: session.data.userId,
    },
    select: {
      factId: true,
    },
  });
  const bookmarkedSet = new Set(bookmark.map((b) => b.factId));

  const userPreferences = await prisma.userPreference.findMany({
    where: {
      userId: session.data.userId,
    },
    select: {
      preference: {
        select: {
          name: true,
        },
      },
    },
  });
  const topics = userPreferences.map(
    (preference) => preference.preference.name
  );

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
