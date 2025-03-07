import checkSession from "@/libs/check-session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

export default async function Layout({ children }) {
  const cookieStore = await cookies();
  const topics = cookieStore.get("topics")?.value;
  const session = await checkSession();

  if (topics || session.data.user?.hasCompletedOnboarding) {
    redirect("/");
  }

  return <div className="w-full min-screen">{children}</div>;
}
