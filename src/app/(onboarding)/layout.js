import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

export default async function Layout({ children }) {
  const cookieStore = await cookies();
  const topics = cookieStore.get("topics")?.value;

  if (topics) {
    redirect("/");
  }

  return <div className="w-full min-screen">{children}</div>;
}
