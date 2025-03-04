import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LibroCard from "./LibroCard";

export default function AllBooks({ libros, onBack }) {
    const [orden, setOrden] = useState("vencimiento");
    const [librosOrdenados, setLibrosOrdenados] = useState([]);

    useEffect(() => {
        const hoy = new Date();
        const librosFiltrados = [...libros]
            .filter(libro => libro.fechapedido || libro.fechavencimiento)
            .sort((a, b) => {
                if (orden === "vencimiento") {
                    return new Date(a.fechavencimiento) - new Date(b.fechavencimiento);
                } else {
                    return Math.abs(new Date(a.fechapedido) - hoy) - Math.abs(new Date(b.fechapedido) - hoy);
                }
            });

        setLibrosOrdenados(librosFiltrados);
    }, [orden, libros]);

    return (
        <div className="w-full">
            <button onClick={onBack} className="text-blue-500 hover:underline mb-4">
                ← Volver
            </button>

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
