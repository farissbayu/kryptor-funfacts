"use client";

import { Button, Chip } from "@heroui/react";
import { useState } from "react";
import selectTopicsAction from "../action";

export const TopicSelection = ({ topics }) => {
  const [selectedTopics, setSelectedTopics] = useState([]);

  function handleSelectTopic(topic) {
    setSelectedTopics((prevValue) => {
      const isTopicSelected = prevValue.some((t) => t.id === topic.id);

      // Jika topic sudah terpilih, maka hapus dari daftar topic
      if (isTopicSelected) {
        return prevValue.filter((t) => t.id !== topic.id);
      }
      // Jika belum di pilih dan masih di bawah 3 maka tambahkan pada spread array
      if (prevValue.length < 3) {
        return [...prevValue, topic];
      }

      // Jika sudah mencapai batas 3, tidak melakukan perubahan
      return prevValue;
    });
  }

  return (
    <>
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
          onPress={async () => selectTopicsAction(selectedTopics)}
          isDisabled={selectedTopics.length < 3}
        >
          {selectedTopics.length < 3 ? "Pick more topics" : "Continue"}
        </Button>
      </div>
    </>
  );
};
