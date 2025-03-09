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

export default async function Page() {
  const cookieStore = await cookies();
  const topics = cookieStore.get("topics")?.value;
  // topics diubah menjadi array
  const parsedTopics = topics ? JSON.parse(topics) : [];
  const topicMap = parsedTopics.map((topic) => topic.name);
  const session = await checkSession();

  if (!session) {
    const data = await prisma.fact.findMany({
      where: {
        preferenceId: {
          in: topicMap,
        },
      },
    });
    return (
      <div className="h-screen block">
        <ContentFeed data={data} session={session} />
      </div>
    );
  } else {
    const data = await prisma.fact.findMany();
    const bookmark = await prisma.bookmark.findMany({
      where: {
        userId: session.data.userId,
      },
      select: {
        factId: true,
      },
    });
    const bookmarkedSet = new Set(bookmark.map((b) => b.factId));
    console.log(bookmarkedSet);
    return (
      <div className="h-screen block">
        <ContentFeed data={data} session={session} bookmark={bookmarkedSet} />
      </div>
    );
  }
}
