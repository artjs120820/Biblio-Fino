"use client";

import "../globals.css";
import { useState } from "react";
import Header from "./components/Header";
import Lateral from "./components/Lateral";

export default function RootLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex flex-col h-screen">
      <Header setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />

      <div className="flex flex-1 relative overflow-hidden">
        <div
          className={`absolute left-0 top-0 h-full transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-64"
            }`}
          style={{ width: "16rem" }}
        >
          <Lateral />
        </div>
        <main
          className={`flex-1 p-4 transition-all scroll-m-1 duration-300 overflow-auto ${sidebarOpen ? "ml-64" : "ml-0"
            }`}
        >
          {children}
        </main>

      </div>
    </div>
  );
}
