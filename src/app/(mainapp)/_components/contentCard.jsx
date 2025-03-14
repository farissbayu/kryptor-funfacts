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
import {
  RemoveBookmarkAction,
  AddBookmarkAction,
} from "../actions/bookmark-action";
import IconBookmarkBlack from "@/components/icon/icon-bookmark-black";
import IconMagnifier from "@/components/icon/icon-magnifier";

export default function ContentCard({
  item,
  index,
  session,
  bookmark,
  isBookmarkPage = false,
}) {
  const isBookmarked = bookmark ? bookmark.has(item.id) : "";
  function getRandomColor() {
    const color = ["primary", "secondary", "success", "warning", "danger"];
    return color[index % color.length];
  }

  async function handleBookmark() {
    const userId = session.data.userId;
    if (!isBookmarked) {
      AddBookmarkAction(userId, item.id);
    } else {
      RemoveBookmarkAction(userId, item.id);
    }
  }

  const cardContent = (
    <Card className="p-5 max-w-[400px]" key={item.id} data-index={index}>
      <div className="w-[150px] absolute top-0 right-0 scale-x-[-1] opacity-10 translate-x-5 -translate-y-5">
        <IconMagnifier></IconMagnifier>
      </div>
      <CardHeader>
        <h1 className="font-semibold text-xl">{item.title}</h1>
      </CardHeader>
      <CardBody className="space-y-2">
        <span>
          <p className="italic">{item.content}</p>
        </span>
        <Link
          href={item.references}
          className="text-blue-500 text-sm underline"
          target="_blank"
        >
          Reference
        </Link>
      </CardBody>
      <CardFooter className="flex w-full justify-between">
        <Chip className="text-white" size="sm" color={`${getRandomColor()}`}>
          {item.preference.name}
        </Chip>
        {session.isLoggedIn && (
          <Button className="bg-transparent min-w-fit" onPress={handleBookmark}>
            {isBookmarked ? (
              <IconBookmarkBlack width={36} height={36} />
            ) : (
              <IconBookmarkWhite width={36} height={36} />
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
