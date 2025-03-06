import { Navbar } from "@/components/navbar";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

export default async function Layout({ children }) {
  const cookieStore = await cookies();
  const topics = cookieStore.get("topics")?.value;

  if (!topics) {
    redirect("/onboarding");
  }

  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
}
