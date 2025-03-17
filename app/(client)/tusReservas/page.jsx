"use client"
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LibroCard from "../reservas/components/LibroCard";
import Link from "next/link";
import { useToken } from "../../context/tokenContext";
import reservasApi from "../../api/reserva";

export default function AllBooks() {
    const [libros, setLibros] = useState([]);
    const [orden, setOrden] = useState("vencimiento");
    const [librosOrdenados, setLibrosOrdenados] = useState([]);
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

    useEffect(() => {
        const hoy = new Date();
        const librosFiltrados = [...libros]
            .filter(libro => libro.fecha_reserva || libro.fecha_vencimiento)
            .sort((a, b) => {
                if (orden === "vencimiento") {
                    return new Date(a.fecha_vencimiento) - new Date(b.fecha_vencimiento);
                } else {
                    return Math.abs(new Date(a.fecha_reserva) - hoy) - Math.abs(new Date(b.fecha_reserva) - hoy);
                }
            });

        setLibrosOrdenados(librosFiltrados);
    }, [orden, libros]);

    return (
        <div className="w-full">
            <Link href={"/reservas"} className="text-blue-500 hover:underline mb-4">
                ← Volver
            </Link>

            <h1 className="text-3xl font-bold mb-4">📖 Todos los libros</h1>

            <div className="flex gap-4 mb-6">
                <button
                    onClick={() => setOrden("vencimiento")}
                    className={`px-4 py-2 rounded-lg text-white ${orden === "vencimiento" ? "bg-blue-600" : "bg-gray-400"}`}
                >
                    Ordenar por vencimiento
                </button>
                <button
                    onClick={() => setOrden("reserva")}
                    className={`px-4 py-2 rounded-lg text-white ${orden === "reserva" ? "bg-blue-600" : "bg-gray-400"}`}
                >
                    Ordenar por reserva
                </button>
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={orden}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-4"
                >
                    {librosOrdenados.length > 0 ? (
                        librosOrdenados.map((libro, index) => <LibroCard key={index} libro={libro} />)
                    ) : (
                        <p className="text-gray-600">No hay libros registrados.</p>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
