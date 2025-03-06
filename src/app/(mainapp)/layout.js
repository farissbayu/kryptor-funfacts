import { Navbar } from "@/components/navbar";
import React from "react";

export default function Layout({ children }) {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
}
