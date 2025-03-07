"use server";

import { google } from "@/utils/arctic";
import * as arctic from "arctic";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function continueWithGoogleAction(_) {
  const cookieStore = await cookies();

  const state = arctic.generateState();
  const codeVerifier = arctic.generateCodeVerifier();
  const scopes = ["openid", "profile", "email"];
  const url = google.createAuthorizationURL(state, codeVerifier, scopes);

  cookieStore.set("codeVerifier", codeVerifier, {
    httpOnly: true,
  });

  redirect(url.href);
}
