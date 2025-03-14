"use client";

import { useState } from "react";
import { Menu, User } from "lucide-react";
import { motion } from "framer-motion";
import LoginModal from "../../(empty)/login/page";
import { useUser } from "../../context/UserContext";
import { useToken } from "../../context/tokenContext";  
import { useRouter } from "next/navigation";


export default function Header({ setSidebarOpen, sidebarOpen }) {
    const [showLogin, setShowLogin] = useState(false);
    const { user, logout } = useUser();
    const { tokenData, cerrarSesion } = useToken();
    const router = useRouter();

    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleLogout = () => {
        cerrarSesion();
        setDropdownOpen(false);
        router.push("/reservas"); 
    };

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
                    {tokenData ? (
                        <div className="relative">
                            <button
                                className="text-white font-semibold"
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                            >
                                Bienvenido, {tokenData.correo || "Usuario"}
                            </button>

                            {dropdownOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="absolute right-0 mt-2 w-48 bg-gray-800 shadow-lg rounded-md z-50"
                                >
                                    <button
                                        className="block w-full text-left px-4 py-2 text-white hover:bg-gray-700"
                                        onClick={handleLogout}
                                    >
                                        Salir
                                    </button>
                                </motion.div>
                            )}
                        </div>
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
