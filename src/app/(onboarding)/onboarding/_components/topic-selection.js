"use client";

import { Button, Chip } from "@heroui/react";
import { useState } from "react";
import selectTopicsAction from "../action";
import LoadingOverlay from "./loading-overlay";

export const TopicSelection = ({ topics }) => {
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSelectTopic = (topic) => {
    const isSelected = selectedTopics.some((x) => x.id === topic.id);
    if (isSelected) {
      setSelectedTopics(selectedTopics.filter((x) => x.id !== topic.id));
    } else if (selectedTopics.length < 3) {
      setSelectedTopics([...selectedTopics, topic]);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      await selectTopicsAction(selectedTopics); // API request untuk fetch fakta & simpan di DB
    } catch (error) {
      console.error("Error:", error);
    }
    setIsLoading(false);
  };

  return (
    <div className="relative">
      {isLoading && <LoadingOverlay />}

      <div className="flex flex-wrap justify-center gap-4">
        {topics.map((topic) => {
          const isTopicSelected = selectedTopics.some((x) => x.id === topic.id);
          //Jika Jumlah Topic yang di pilih sudah 3 maka topic yang belum di pilih tidak dapat di click
          //Jika topic sudah terpilih maka bisa di hpauss
          const isDisabled = selectedTopics.length >= 3 && !isTopicSelected;
          return (
            <Chip
              key={topic.id}
              variant="flat"
              className={`cursor-pointer transition-all hover:scale-105 ${
                selectedTopics.some((t) => t.id === topic.id)
                  ? "bg-red-300"
                  : "bg-gray-100"
              }
              ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}
              `}
              onClick={() => handleSelectTopic(topic)}
              isDisabled={isDisabled}
            >
              {topic.name}
            </Chip>
          );
        })}
      </div>
      <div className="flex flex-col space-y-2 items-center">
        <p className="text-sm">{selectedTopics.length} topics selected</p>
        <Button
          variant="solid"
          className="bg-red-500 font-semibold text-white w-48"
          radius="full"
          type="submit"
          onPress={handleSubmit}
          isDisabled={selectedTopics.length < 3}
        >
          {selectedTopics.length < 3 ? "Pick more topics" : "Continue"}
        </Button>
      </div>
    </div>
  );
};
