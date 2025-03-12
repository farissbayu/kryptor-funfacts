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
import ContentCard from "../_components/contentCard";

export default async function page() {
  const session = await checkSession();
  const bookmark = await prisma.bookmark.findMany({
    where: {
      userId: session.data.userId,
    },
    include: {
      fact: true,
    },
  });
  const bookmarkedSet = new Set(bookmark.map((b) => b.factId));
  return (
    <div className="block space-y-5 mt-20">
      {bookmark.map((item, index) => (
        <ContentCard
          item={item.fact}
          index={index}
          session={session}
          bookmark={bookmarkedSet}
          key={item.id}
          isBookmarkPage={true}
        />
      ))}
    </div>
  );
}
