"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import LoginModal from "../../(empty)/login/page";
import LibroCard from "./components/LibroCard";
import Link from "next/link";
import reservasApi from "../../api/reserva";
import { useToken } from "../../context/tokenContext";

export default function Page() {
    const [mostrarLogin, setMostrarLogin] = useState(false);
    const [libros, setLibros] = useState([]);
    const [expandido, setExpandido] = useState(false);
    const [expandido2, setExpandido2] = useState(false);
    const [alturaFila, setAlturaFila] = useState(300);
    const { tokenData } = useToken();
    const contenedorRef = useRef(null);
    const [duracionTransicion, setDuracionTransicion] = useState(0);
    const [duracionTransicion2, setDuracionTransicion2] = useState(0);


    const obtenerReservas = async () => {
        if (!tokenData) return;
        try {
            const response = await reservasApi.obtenerReservas(tokenData.id);
            if (response?.status === 200) {
                setLibros(response.data.reservas || []);
            } else {
                console.error("Error al obtener reservas:", response?.data?.error || "Error desconocido");
            }
        } catch (error) {
            console.error("Error obteniendo reservas:", error);
        }
    };

    const obtenerTodasReservas = async () => {
        if (!tokenData) return;
        try {
            const response = await reservasApi.obtenerTodasReservas();
            if (response?.status === 200) {
                setLibros(response.data.reservas || []);
            } else {
                console.error("Error al obtener reservas:", response?.data?.error || "Error desconocido");
            }
        } catch (error) {
            console.error("Error obteniendo reservas:", error);
        }
    };

    useEffect(() => {
        if (tokenData?.tipo_usuario === "usuario") {
            obtenerReservas();
        } else {
            obtenerTodasReservas();
        }
    }, [tokenData]);

    useEffect(() => {
        if (contenedorRef.current) {
            const children = contenedorRef.current.children;
            let maxHeight = 0;
            let filaCompleta = Math.min(children.length, 3); 

            for (let i = 0; i < filaCompleta; i++) {
                maxHeight = Math.max(maxHeight, children[i].offsetHeight);
            }

            setAlturaFila(maxHeight);
        }
    }, [libros]);

    const ultimasReservas = [...libros]
        .filter(libro => libro.fecha_reserva)
        .sort((a, b) => new Date(b.fecha_reserva) - new Date(a.fecha_reserva));

    const ultimasReservasUsuario = [...libros]
        .filter(libro => libro.fecha_reserva)
        .sort((a, b) => new Date(b.fecha_reserva) - new Date(a.fecha_reserva)).slice(0, 3);;

    const proximosVencer = [...libros]
        .filter(libro => libro.fecha_vencimiento)
        .sort((a, b) => new Date(a.fecha_vencimiento) - new Date(b.fecha_vencimiento))
        .slice(0, 3);

    const proximosVencerAdmin = [...libros]
        .filter(libro => libro.fecha_vencimiento)
        .sort((a, b) => new Date(a.fecha_vencimiento) - new Date(b.fecha_vencimiento));

    return (
        <div className="flex flex-col items-start justify-center w-full">
            {tokenData ? (
                <>
                    <h1 className="text-3xl font-bold mb-4">Bienvenido, {tokenData.nombre}</h1>
                    <div className="w-full flex flex-col gap-6">
                        {/* SECCIÓN DE RESERVAS */}
                        <section className="bg-gray-100 p-6 rounded-lg shadow-md w-full">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-2xl font-semibold">📚 Últimas Reservas</h2>

                                {tokenData.tipo_usuario === "usuario" ? (
                                    <Link href="/tusReservas" className="text-blue-500 hover:underline">
                                        Ver todo
                                    </Link>
                                ) : (
                                    <button
                                        onClick={() => {
                                            setExpandido(!expandido); setDuracionTransicion(0.5);
                                        }}
                                        className="text-blue-500 hover:underline"
                                    >
                                        {expandido ? "Ver menos" : "Ver todo"}
                                    </button>
                                )}
                            </div>
                            {tokenData.tipo_usuario === "usuario" ? (
                                ultimasReservasUsuario.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        {ultimasReservasUsuario.map((libro, index) => (
                                            <LibroCard key={index} libro={libro} tipo={tokenData.tipo_usuario} />
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-600">No hay libros próximos a vencer.</p>
                                )
                            ) : (
                                <motion.div
                                    initial={{ height: alturaFila }}
                                    animate={{ height: expandido ? "auto" : alturaFila }}
                                    transition={{ duration: duracionTransicion, ease: "easeInOut" }}
                                    className="overflow-hidden"
                                >
                                    <div ref={contenedorRef} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        {ultimasReservas.length > 0 ? (
                                            ultimasReservas.map((libro, index) => (
                                                <LibroCard key={index} libro={libro} tipo={tokenData.tipo_usuario} />
                                            ))
                                        ) : (
                                            <p className="text-gray-600">No tienes reservas recientes.</p>
                                        )}
                                    </div>
                                </motion.div>
                            )}
                        </section>
                        <section className="bg-red-100 p-6 rounded-lg shadow-md w-full">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-2xl font-semibold mb-4">⏳ Próximos a Vencer</h2>

                                {tokenData.tipo_usuario === "usuario" ? (
                                    <Link href="/tusReservas" className="text-blue-500 hover:underline">
                                        Ver todo
                                    </Link>
                                ) : (
                                    <button
                                        onClick={() => {
                                            setExpandido2(!expandido2); setDuracionTransicion2(0.5);
                                        }}
                                        className="text-blue-500 hover:underline"
                                    >
                                        {expandido2 ? "Ver menos" : "Ver todo"}
                                    </button>
                                )}
                            </div>
                            {tokenData.tipo_usuario === "usuario" ? (
                                proximosVencer.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        {proximosVencer.map((libro, index) => (
                                            <LibroCard key={index} libro={libro} tipo={tokenData.tipo_usuario} />
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-600">No hay libros próximos a vencer.</p>
                                )
                            ) : (
                                <motion.div
                                    initial={{ height: alturaFila }}
                                    animate={{ height: expandido2 ? "auto" : alturaFila }}
                                    transition={{ duration: duracionTransicion2, ease: "easeInOut" }}
                                    className="overflow-hidden"
                                >
                                    <div ref={contenedorRef} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        {proximosVencerAdmin.length > 0 ? (
                                            proximosVencerAdmin.map((libro, index) => (
                                                <LibroCard key={index} libro={libro} tipo={tokenData.tipo_usuario} />
                                            ))
                                        ) : (
                                            <p className="text-gray-600">No tienes reservas recientes.</p>
                                        )}
                                    </div>
                                </motion.div>
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
