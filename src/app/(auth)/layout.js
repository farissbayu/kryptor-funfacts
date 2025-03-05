import checkSession from "@/libs/check-session";
import { redirect } from "next/navigation";

export default async function Layout({ children }) {
  const session = await checkSession();

  if (session?.isLoggedIn) {
    redirect("/");
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      {children}
    </div>
  );
}
