import { Navbar } from "@/components/navbar";
import checkSession from "@/libs/check-session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

export default async function Layout({ children }) {
  const cookieStore = await cookies();
  const topics = cookieStore.get("topics")?.value;
  const session = await checkSession();

  if (!topics && !session.isLoggedIn) {
    console.log("redirect from unauthenticated user");
    redirect("/onboarding");
  }

  if (session.isLoggedIn && !session.data.user?.hasCompletedOnboarding) {
    console.log("redirect from authenticated user");
    redirect("/onboarding");
  }

  return (
    <div>
      <Navbar />
      <main className="w-full flex justify-center items-center relative p-10 overflow-y-scroll snap-y snap-mandatory scrollbar-hide">
        {children}
      </main>
    </div>
  );
}
