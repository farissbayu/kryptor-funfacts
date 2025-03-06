"use client";

import { TOPICS } from "@/libs/topics";
import { Button, Card, CardBody, CardHeader, Chip } from "@heroui/react";
import { useState } from "react";
import selectTopicsAction from "./action";

export default function Page() {
  const [selectedTopics, setSelectedTopics] = useState([]);

  function handleSelectTopic(topic) {
    setSelectedTopics((prevValue) =>
      prevValue.includes(topic)
        ? prevValue.filter((t) => t !== topic)
        : [...prevValue, topic]
    );
  }

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
            <div className="flex flex-wrap justify-center gap-4">
              {TOPICS.map((topic) => (
                <Chip
                  key={topic}
                  variant="flat"
                  className={`cursor-pointer transition-all hover:scale-105 ${
                    selectedTopics.includes(topic)
                      ? "bg-red-300"
                      : "bg-gray-100"
                  }`}
                  onClick={() => handleSelectTopic(topic)}
                >
                  {topic}
                </Chip>
              ))}
            </div>
            <div className="flex flex-col space-y-2 items-center">
              <p className="text-sm">{selectedTopics.length} topics selected</p>
              <Button
                variant="solid"
                className="bg-red-500 font-semibold text-white w-48"
                radius="full"
                type="submit"
                onPress={async () => selectTopicsAction(selectedTopics)}
                isDisabled={selectedTopics.length < 3}
              >
                {selectedTopics.length < 3 ? "Pick more topics" : "Continue"}
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>
    </main>
  );
}
