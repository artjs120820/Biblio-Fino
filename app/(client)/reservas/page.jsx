"use client";

import { useState, useContext } from "react";
import { useUser } from "../../context/UserContext";
import LoginModal from "../../(empty)/login/page";
import LibroCard from "./components/LibroCard";
import AllBooks from "./components/allBooks";
export default function Page() {
    const [mostrarLogin, setMostrarLogin] = useState(false);
    const { user } = useUser();
    const [mostrarTodos, setMostrarTodos] = useState(false);
    if (mostrarTodos) {
        return <AllBooks libros={user?.librosRegistrados || []} onBack={() => setMostrarTodos(false)} />;
    }
    
    const libros = user?.librosRegistrados || []; 

    const ultimasReservas = [...libros]
        .filter(libro => libro.fechapedido)
        .sort((a, b) => new Date(b.fechapedido) - new Date(a.fechapedido)) 
        .slice(0, 3);

    const proximosVencer = [...libros]
        .filter(libro => libro.fechavencimiento) 
        .sort((a, b) => new Date(a.fechavencimiento) - new Date(b.fechavencimiento)) 
        .slice(0, 3);

    return (
        <div className="flex flex-col items-start justify-center w-full">
            {user ? (
                <>
                    <h1 className="text-3xl font-bold mb-4">Bienvenido, {user.nombre}</h1>

                    <div className="w-full flex flex-col gap-6">
                        <section className="bg-gray-100 p-6 rounded-lg shadow-md w-full">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-2xl font-semibold">📚 Últimas Reservas</h2>
                                <button onClick={() => setMostrarTodos(true)} className="text-blue-500 hover:underline">Ver todo</button>
                            </div>
                            {ultimasReservas.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {ultimasReservas.map((libro, index) => (
                                        <LibroCard key={index} libro={libro} />
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-600">No tienes reservas recientes.</p>
                            )}
                        </section>

                        <section className="bg-red-100 p-6 rounded-lg shadow-md w-full">
                            <h2 className="text-2xl font-semibold mb-4">⏳ Próximos a Vencer</h2>
                            {proximosVencer.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {proximosVencer.map((libro, index) => (
                                        <LibroCard key={index} libro={libro} />
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-600">No hay libros próximos a vencer.</p>
                            )}
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