import checkSession from "@/libs/check-session";
import generateFact from "@/libs/generate-fact";
import { getFacts } from "@/libs/get-facts";

export async function GET(request) {
  try {
    const { userId } = (await checkSession()).data;

    // Ambil query parameter dari request
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page")) || 1;
    const limit = parseInt(url.searchParams.get("limit")) || 5;

    const result = await getFacts(userId, page, limit);
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

    const result = await generateFact(topics, session.data.userId);

    return Response.json({ result });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
