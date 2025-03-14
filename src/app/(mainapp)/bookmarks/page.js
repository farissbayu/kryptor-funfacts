import { prisma } from "@/utils/prisma";
import checkSession from "@/libs/check-session";
import ContentCard from "../_components/contentCard";

export default async function page() {
  const session = await checkSession();
  const bookmark = await prisma.bookmark.findMany({
    where: {
      userId: session.data.userId,
    },
    include: {
      fact: {
        include: {
          preference: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });
  const bookmarkedSet = new Set(bookmark.map((b) => b.factId));

  return (
    <div className="flex flex-wrap gap-8 justify-center md:mt-20 mt-60">
      {bookmark.map((item, index) => (
        <ContentCard
          item={item.fact}
          index={index}
          session={session}
          bookmark={bookmarkedSet}
          key={item.id}
          isBookmarkPage={true}
        />
      ))}
    </div>
  );
}
