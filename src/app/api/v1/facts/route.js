import checkSession from "@/libs/check-session";
import generateFact from "@/libs/generate-fact";
import { getFacts } from "@/libs/get-facts";
import { cookies } from "next/headers";

export async function GET(request) {
  try {
    const session = await checkSession();
    const cookieStore = await cookies();
    const cookiesTopics = cookieStore.get("topics")?.value;
    const topics = cookiesTopics ? JSON.parse(cookiesTopics) : [];

    // Ambil query parameter dari request
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page")) || 1;
    const limit = parseInt(url.searchParams.get("limit")) || 5;

    const result = await getFacts(
      session.isLoggedIn ? session.data.userId : "",
      page,
      limit,
      topics
    );
    console.log(result);
    return Response.json(result);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { topics } = body;
    const session = await checkSession();

    const result = await generateFact(
      topics,
      session.isLoggedIn ? session.data.userId : ""
    );

    return Response.json({ result });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
