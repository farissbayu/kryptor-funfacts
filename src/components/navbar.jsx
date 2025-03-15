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
    cookiesStore.delete("codeVerifier");
  }

  return (
    <header className="fixed top-8 left-1/2 -translate-x-1/2 w-4/5 border-2 border-red-500 md:rounded-full rounded-3xl py-2 px-8 bg-white/70 backdrop-blur-md z-50 mx-auto">
      <nav className="w-full flex md:flex-row flex-col justify-between items-center md:space-y-0 space-y-4">
        <Logo size="sm" />
        <div className="flex md:flex-row flex-col text-center md:space-x-12 md:space-y-0 space-y-2">
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
