"use client";

import { useState } from "react";
import { Menu, User } from "lucide-react";
import LoginModal from "../../(empty)/login/page";
import { useUser } from "../../context/UserContext"; 


export default function Header({ setSidebarOpen, sidebarOpen }) {
    const [showLogin, setShowLogin] = useState(false);
    const { user } = useUser(); 
    return (
        <>
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
                    {user ? (
                        <span className="text-white font-semibold">Bienvenido, {user.correo}</span>
                    ) : (
                        <button onClick={() => setShowLogin(true)}>
                            <User size={28} className="text-white cursor-pointer hover:text-gray-400 transition-colors" />
                        </button>
                    )}
                </nav>
            </header>

            <LoginModal showLogin={showLogin} setShowLogin={setShowLogin} />
        </>
    );
}
