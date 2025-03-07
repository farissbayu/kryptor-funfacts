import { Logo } from "./logo";
import Link from "next/link";
import checkSession from "@/libs/check-session";
import { Button } from "@heroui/react";
import { cookies } from "next/headers";

export const Navbar = async () => {
  const session = await checkSession();

  async function logoutAction() {
    "use server";

    const cookiesStore = await cookies();
    cookiesStore.delete("sessionId");
  }

  return (
    <header className="fixed top-8 left-1/2 -translate-x-1/2 w-4/5 border-2 border-red-500 rounded-lg py-2 px-8 bg-white/70 backdrop-blur-md z-50">
      <nav className="w-full flex flex-row justify-between items-center">
        <Logo size="sm" />
        <div className="flex flex-row space-x-12">
          <Link href="/" className="hover:text-red-500 font-semibold">
            Home
          </Link>
          {session.isLoggedIn && (
            <Link
              href="/bookmarks"
              className="hover:text-red-500 font-semibold"
            >
              Bookmarks
            </Link>
          )}
          <Link href="/about" className="hover:text-red-500 font-semibold">
            About
          </Link>
        </div>
        {!session.isLoggedIn && (
          <Link
            href="/login"
            className="border border-transparent rounded-xl hover:border-red-500 px-4 py-2 hover:text-red-500 hover:font-semibold"
          >
            Login
          </Link>
        )}
        {session.isLoggedIn && (
          <form action={logoutAction}>
            <Button
              type="submit"
              variant="bordered"
              className="border border-red-500 hover:bg-red-100"
            >
              Logout
            </Button>
          </form>
        )}
      </nav>
    </header>
  );
};
