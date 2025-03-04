"use client";

import { useState } from "react";
import { Menu, User } from "lucide-react";
import { motion } from "framer-motion";
import LoginModal from "../../(empty)/login/page";
import { useUser } from "../../context/UserContext";

export default function Header({ setSidebarOpen, sidebarOpen }) {
    const [showLogin, setShowLogin] = useState(false);
    const { user, logout } = useUser();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    // 🔥 Función para cerrar sesión
    const handleLogout = () => {
        // Eliminar la cookie del token
        document.cookie = "auth_token=; path=/; max-age=0";

        // Limpiar el contexto del usuario
        logout();

        // Cerrar el menú desplegable
        setDropdownOpen(false);

        // Recargar la página
        window.location.reload();
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
                    {user ? (
                        <div className="relative">
                            <button
                                className="text-white font-semibold"
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                            >
                                Bienvenido, {user.correo}
                            </button>

                            {dropdownOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="absolute right-0 mt-2 w-48 bg-gray-800 shadow-lg rounded-md z-50" // 🔥 Agregado `z-50`
                                    style={{ pointerEvents: "auto" }} // 🔥 Se asegura de que se pueda interactuar con todo el dropdown
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
