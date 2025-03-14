"use client";
import ResultsCarousel from "../components/CarruselResults";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useState } from "react";
import { motion } from "framer-motion";

import copiaApi from "../../../api/copia";

export default function Resultados() {
    const router = useRouter();
    const params = useParams();
    const searchParams = useSearchParams();
    const searchTerm = decodeURIComponent(params?.searchTerm || "");
    const page = parseInt(searchParams.get("page"))
    console.log("PAGINAAAA", page)
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [books, setBooks] = useState([]);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        if (!searchTerm) {
            router.replace("/");
            return;
        }
    
        if (isNaN(page) || page < 1) {
            setError("Número de página inválido. Intenta con un valor mayor o igual a 1.");
            setBooks([]);
            setTotalPages(1);
            return;
        }
    
        setLoading(true);
        setError(null);
    
        const fetchBooks = async () => {
            const response = await copiaApi.busqueda(searchTerm, page);
    
            if (response?.data?.copias) {
                const total = Math.ceil(response.data.total_copias / 3);
                setTotalPages(total);
    
                if (page > total) {
                    setError(`La página ${page} no existe para la busqueda de "${searchTerm}" no existe.`);
                    setBooks([]);
                } else {
                    setBooks(response.data.copias);
                }
            } else {
                setError("No se encontraron resultados.");
                setBooks([]);
            }
    
            setLoading(false);
        };
    
        fetchBooks();
    }, [searchTerm, page]);
    
    
    return (
        <div className="relative w-full">
            <h1 className="text-2xl font-bold text-center">Búsqueda - Resultados</h1>

            {loading && <p className="text-center text-gray-500">Cargando...</p>}

            {error && (
                <>
                <motion.div
                    className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mt-4 max-w-md mx-auto rounded-lg shadow-lg"
                    initial={{ opacity: 0, y: -20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.9 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                    <div className="flex items-center flex-col">
                    <div className="flex items-center space-x-2">
                        <span className="text-2xl">⚠️</span>
                        <p className="font-semibold">{error}</p>
                    </div><button
                onClick={() => router.push("/")}
                className="px-6 py-3 mt-4 text-white font-medium bg-gradient-to-r from-cyan-600 to-cyan-800 hover:from-cyan-500 hover:to-cyan-700 rounded-lg shadow-md transform transition-all duration-300 hover:scale-105"
            >
                Volver a buscar
            </button></div>
                </motion.div>
                
             </>
            )}

            {!loading && !error && (
                <ResultsCarousel
                    data={books}
                    page={page}
                    onBack={() => router.push("/")}
                    searchTerm={searchTerm}
                    totalPages={totalPages}
                />
            )}
        </div>
    );
}
