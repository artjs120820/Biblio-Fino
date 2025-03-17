"use client";

import { useState, useEffect } from "react";
import LoginModal from "../../(empty)/login/page";
import LibroCard from "./components/LibroCard";
import Link from "next/link";
import reservasApi from "../../api/reserva";
import { useToken } from "../../context/tokenContext";

export default function Page() {
    const [mostrarLogin, setMostrarLogin] = useState(false);
    const [libros, setLibros] = useState([]);
    const { tokenData } = useToken();

    const obtenerReservas = async () => {
        try {
            if (!tokenData) return;
            const response = await reservasApi.obtenerReservas(tokenData.id);
            if (response?.status === 200) {
                setLibros(response.data.reservas || []);
                console.log(response.data.reservas)
            } else {
                console.error("Error al obtener reservas:", response?.data?.error || "Error desconocido");
            }
        } catch (error) {
            console.error("Error obteniendo reservas:", error);
        }
    };

    useEffect(() => {
        obtenerReservas();
    }, [tokenData]);
     const ultimasReservas = [...libros]
        .filter(libro => libro.fecha_reserva)
        .sort((a, b) => new Date(b.fecha_reserva) - new Date(a.fecha_reserva))
        .slice(0, 3);

    const proximosVencer = [...libros]
        .filter(libro => libro.fecha_vencimiento)
        .sort((a, b) => new Date(a.fecha_vencimiento) - new Date(b.fecha_vencimiento))
        .slice(0, 3);

    return (
        <div className="flex flex-col items-start justify-center w-full">
            {tokenData ? (
                <>
                    <h1 className="text-3xl font-bold mb-4">Bienvenido, {tokenData.nombre}</h1>

                    <div className="w-full flex flex-col gap-6">
                        <section className="bg-gray-100 p-6 rounded-lg shadow-md w-full">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-2xl font-semibold">📚 Últimas Reservas</h2>
                                <Link href="/tusReservas" className="text-blue-500 hover:underline">
                                    Ver todo
                                </Link>
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