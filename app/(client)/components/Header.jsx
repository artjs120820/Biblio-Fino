"use client";

import { Menu, User } from "lucide-react";

export default function Header({ setSidebarOpen, sidebarOpen }) {
    return (
        <header className="w-full bg-gray-900 text-white p-4">
            <nav className="flex justify-between items-center mx-auto">
                <button
                    className="text-white"
                    onClick={() => setSidebarOpen((prev) => !prev)}
                >
                    <Menu
                        size={28}
                        className={`transition-transform duration-300 ease-in-out ${sidebarOpen ? "rotate-0" : "rotate-90"
                            }`}
                    />
                </button>
                <h1 className="text-xl font-semibold">Biblioteca</h1>
                <button className="text-white">
                    <User size={28} />
                </button>
            </nav>
        </header>
    );
}
