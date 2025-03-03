"use client";

import { useState, useContext } from "react";
import { useUser } from "../../context/UserContext";

import LoginModal from "../../(empty)/login/page";

export default function Page() {
    const [mostrarLogin, setMostrarLogin] = useState(false);
    const { user } = useUser();


    return (
        <div className="flex flex-col items-start justify-center p-8 w-full">
            {user ? (
                <>
                    <h1 className="text-3xl font-bold mb-4">Bienvenido, {user.email}</h1>
                    <div className="w-full flex flex-col gap-6">
                        <section className="bg-gray-100 p-6 rounded-lg shadow-md w-full">
                            <h2 className="text-2xl font-semibold mb-4">📚 Últimas Reservas</h2>
                            <p className="text-gray-600">Aquí aparecerán los libros que has reservado recientemente.</p>
                        </section>

                        <section className="bg-red-100 p-6 rounded-lg shadow-md w-full">
                            <h2 className="text-2xl font-semibold mb-4">⏳ Próximas a Vencer</h2>
                            <p className="text-gray-600">Revisar los libros que están cerca de su fecha de vencimiento.</p>
                        </section>
                    </div>
                </>
            ) : (
                <>
                    <h1 className="text-3xl font-bold mb-4">Reservas</h1>
                    <p className="text-lg mb-4">Para reservar libros, debes iniciar sesión primero.</p>
                    <button
                        onClick={() => setMostrarLogin(true)}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                    >
                        Iniciar sesión
                    </button>
                </>
            )}

            {mostrarLogin && <LoginModal showLogin={mostrarLogin} setShowLogin={setMostrarLogin} />}
        </div>
    );
}
