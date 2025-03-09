"use client";
import IconBookmarkWhite from "@/components/icon/icon-bookmark-white";

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
} from "@heroui/react";
import Link from "next/link";
import { useActionState } from "react";
import {
  RemoveBookmarkAction,
  AddBookmarkAction,
} from "../actions/bookmark-action";
import IconBookmarkBlack from "@/components/icon/icon-bookmark-black";

export default function ContentCard({
  item,
  index,
  session,
  bookmark = null,
  isBookmarkPage = false,
}) {
  const isBookmarked = bookmark.has(item.id);
  function getRandomColor() {
    const color = ["primary", "secondary", "success", "warning", "danger"];
    return color[index % color.length];
  }

  async function handleBookmark() {
    const userId = session.data.userId;
    console.log(userId, item.id);
    if (!isBookmarked) {
      AddBookmarkAction(userId, item.id);
    } else {
      RemoveBookmarkAction(userId, item.id);
    }
  }
  const cardContent = (
    <Card
      className="p-5  border-2 border-red-400"
      key={item.id}
      data-index={index}
    >
      <CardHeader className="items-center justify-center">
        <h1 className="font-semibold text-md">{item.title}</h1>
      </CardHeader>
      <CardBody className="space-y-2 items-center justify-center">
        <span>
          <p className="italic">{item.content}</p>
        </span>
        <div className="justify-end items-end">
          <Chip className="text-white" size="sm" color={`${getRandomColor()}`}>
            {item.preferenceId}
          </Chip>
        </div>
        <Link
          href={item.references}
          className="text-blue-500 text-sm"
          target="_blank"
        >
          reference
        </Link>
      </CardBody>
      <CardFooter className="justify-end items-end">
        {session.isLoggedIn && (
          <Button className="bg-transparent w-5 h-5" onPress={handleBookmark}>
            {isBookmarked ? (
              <IconBookmarkBlack width={20} height={20} />
            ) : (
              <IconBookmarkWhite width={20} height={20} />
            )}
          </Button>
        )}
      </CardFooter>
    </Card>
  );

  if (isBookmarkPage) {
    return <>{cardContent}</>;
  }
  return (
    <div
      className="h-screen w-[365px] snap-start flex flex-col items-center justify-center relative"
      data-index={index}
    >
      {cardContent}
    </div>
  );
}
