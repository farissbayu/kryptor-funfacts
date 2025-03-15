"use client";

import { useEffect, useRef, useState } from "react";
import ContentCard from "./contentCard";
import IconBg from "@/components/icon/icon-bg";

export default function ContentFeed({ userTopics, session, bookmark }) {
  const [facts, setFacts] = useState([]);
  const [page, setPage] = useState(1);
  const containerRef = useRef(null);
  const fetching = useRef(false);
  const generating = useRef(false);

  async function getFacts() {
    if (fetching.current) return;
    fetching.current = true;

    try {
      const res = await fetch(`/api/v1/facts?page=${page}&limit=5`);
      const { facts: newFacts } = await res.json();
      setFacts((prev) => [...prev, ...newFacts]);
      setPage((prev) => prev + 1);
    } catch (error) {
      console.error(error);
    } finally {
      fetching.current = false;
    }
  }

  async function generateFacts() {
    if (generating.current) return;
    generating.current = true;

    try {
      await fetch("/api/v1/facts", {
        method: "POST",
        body: JSON.stringify({ topics: userTopics }),
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      console.log("Facts generated");
    } catch (error) {
      console.log(error);
    } finally {
      generating.current = false;
    }
  }

  /**
   * Initial fetch when first mount
   */
  useEffect(() => {
    getFacts();
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      const cardHeight = container.clientHeight;
      const index = Math.round(scrollTop / cardHeight);

      if (index >= facts.length - 4) {
        console.log("Generating facts with AI...");
        generateFacts();
      }

      if (index >= facts.length - 2) {
        getFacts();
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [facts]);

  return (
    <div
      ref={containerRef}
      className="h-screen w-screen grid justify-center overflow-y-auto snap-y snap-mandatory scrollbar-hide"
    >
      <span className="fixed inset-0 flex items-center justify-center pointer-events-none z-0">
        <IconBg />
      </span>
      <span className="fixed left-0 right-[0] bottom-[100px] flex items-center justify-center pointer-events-none z-50 text-xl font-bold">
        Scroll Up or Down to Navigate
      </span>
      {facts.map((item, index) => (
        <ContentCard
          key={index}
          item={item}
          index={index}
          session={session}
          bookmark={bookmark}
        />
      ))}
    </div>
  );
}
