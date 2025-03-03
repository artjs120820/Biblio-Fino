'use client'
import { useState } from "react";
import LoginModal from "../../(empty)/login/page";

export default function Page() {
    const [mostrarLogin, setMostrarLogin] = useState(false);

    return (
        <div className="flex flex-col items-start justify-center p-8">
            <h1 className="text-3xl font-bold mb-4">Reservas</h1>
            <p className="text-lg mb-4">Para reservar libros, debes iniciar sesión primero.</p>
            <button 
                onClick={() => setMostrarLogin(true)} 
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            >
                Iniciar sesión
            </button>

            {mostrarLogin && <LoginModal showLogin={mostrarLogin} setShowLogin={setMostrarLogin}  />}
        </div>
    );
}
