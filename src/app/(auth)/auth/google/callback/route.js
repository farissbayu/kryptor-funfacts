import { google } from "@/utils/arctic";
import { prisma } from "@/utils/prisma";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code");

  const cookieStore = await cookies();
  const codeVerifier = cookieStore.get("codeVerifier")?.value;

  const tokens = await google.validateAuthorizationCode(code, codeVerifier);
  const accessToken = tokens.accessToken();

  const res = await fetch("https://openidconnect.googleapis.com/v1/userinfo", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const data = await res.json();

  const user = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  let newUser = {};
  if (!user) {
    newUser = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
      },
    });
  }

  const newSession = await prisma.session.create({
    data: {
      userId: newUser.id,
    },
  });
  cookieStore.set("sessionId", newSession.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  redirect("/");
}
