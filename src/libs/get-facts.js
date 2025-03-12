import { prisma } from "@/utils/prisma";

export async function getFacts(userId, page = 1, limit = 5) {
  const facts = await prisma.fact.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: limit,
    skip: (page - 1) * limit,
  });

  const totalFacts = await prisma.fact.count({
    where: { userId },
  });

  return {
    facts,
    totalFacts,
    totalPages: Math.ceil(totalFacts / limit),
  };
}
