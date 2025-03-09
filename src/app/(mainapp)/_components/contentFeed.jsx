"use client";

import { useEffect, useRef, useState } from "react";
import ContentCard from "./contentCard";

export default function ContentFeed({ data, session, bookmark }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setloading] = useState(false);

  const containerRef = useRef(null);
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      const cardHeight = container.clientHeight;
      const index = Math.round(scrollTop / cardHeight);
      setCurrentIndex(index);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {});

  return (
    <div ref={containerRef}>
      {data.map((item, index) => (
        <ContentCard
          key={item.id}
          item={item}
          index={index}
          session={session}
          bookmark={bookmark}
        />
      ))}
    </div>
  );
}
