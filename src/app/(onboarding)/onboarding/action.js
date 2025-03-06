"use server";

import checkSession from "@/libs/check-session";
import { cookies } from "next/headers";

export default async function selectTopicsAction(selectedTopics) {
  const cookieStore = await cookies();
  const topics = selectedTopics.join(",");

  const session = await checkSession();

  if (!session?.isLoggedIn) {
    cookieStore.set("topics", topics);
  }
}
