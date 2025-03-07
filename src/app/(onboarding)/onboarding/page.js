import { prisma } from "@/utils/prisma";
import { Card, CardBody, CardHeader } from "@heroui/react";
import { TopicSelection } from "./_components/topic-selection";
import checkSession from "@/libs/check-session";

export default async function Page() {
  const topics = await prisma.preference.findMany();

  return (
    <main className="w-full min-h-screen bg-gradient-to-br from-red-50 to-yellow-50 flex justify-center items-center">
      <div className="w-3/5 mx-auto ">
        <Card className="rounded-xl p-8 bg-white/70 backdrop-blur-xs">
          <CardHeader className="flex flex-col items-center space-y-2">
            <h1 className="font-semibold text-3xl">
              Welcome to{" "}
              <span className="bg-gradient-to-r from-red-600 via-red-500 to-yellow-500 text-transparent bg-clip-text">
                FunFacts.
              </span>
            </h1>
            <h2 className="text-lg">
              Pick your favorite topics before starting your adventure here!
            </h2>
            <p className="text-sm text-gray-500">
              Select at least 3 topics to get personalized fun facts
            </p>
          </CardHeader>
          <CardBody className="px-8 space-y-4">
            <TopicSelection topics={topics} />
          </CardBody>
        </Card>
      </div>
    </main>
  );
}
