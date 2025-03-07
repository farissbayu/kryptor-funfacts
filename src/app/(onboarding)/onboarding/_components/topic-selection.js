"use client";

import { Button, Chip } from "@heroui/react";
import { useState } from "react";
import selectTopicsAction from "../action";

export const TopicSelection = ({ topics }) => {
  const [selectedTopics, setSelectedTopics] = useState([]);

  function handleSelectTopic(topic) {
    setSelectedTopics((prevValue) => {
      const isTopicSelected = prevValue.some((t) => t.id === topic.id);

      return isTopicSelected
        ? prevValue.filter((t) => t.id !== topic.id)
        : [...prevValue, topic];
    });
  }

  return (
    <>
      <div className="flex flex-wrap justify-center gap-4">
        {topics.map((topic) => (
          <Chip
            key={topic.id}
            variant="flat"
            className={`cursor-pointer transition-all hover:scale-105 ${
              selectedTopics.some((t) => t.id === topic.id)
                ? "bg-red-300"
                : "bg-gray-100"
            }`}
            onClick={() => handleSelectTopic(topic)}
          >
            {topic.name}
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
    </>
  );
};
