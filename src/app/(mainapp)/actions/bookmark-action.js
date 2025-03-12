"use server";
import { prisma } from "@/utils/prisma";
import { revalidatePath } from "next/cache";

export async function AddBookmarkAction(userId, itemId) {
  console.log(userId, itemId);
  await prisma.bookmark.create({
    data: {
      userId,
      factId: itemId,
    },
  });
  revalidatePath("/");
  return { message: "Bookmark Success!" };
}

export async function RemoveBookmarkAction(userId, itemId) {
  console.log(userId, itemId);
  await prisma.bookmark.deleteMany({
    where: {
      userId: userId,
      factId: itemId,
    },
  });

  revalidatePath("/");
  return { message: "Bookmark Removed!" };
}
