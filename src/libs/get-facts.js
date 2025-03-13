import { prisma } from "@/utils/prisma";

export async function getFacts(userId, page = 1, limit = 5, topics = []) {
  let facts = [];

  if (userId !== "") {
    facts = await prisma.fact.findMany({
      where: {
        userId,
      },
      include: {
        preference: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: limit,
      skip: (page - 1) * limit,
    });
  }

  if (userId === "" && topics.length !== 0) {
    const preferences = topics.map((topic) => topic.id);
    facts = await prisma.fact.findMany({
      where: {
        preferenceId: {
          in: preferences,
        },
      },
      include: {
        preference: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: limit,
      skip: (page - 1) * limit,
    });
  }

  const totalFacts = await prisma.fact.count({
    where: { userId },
  });

  return {
    facts,
    totalFacts,
    totalPages: Math.ceil(totalFacts / limit),
  };
}
