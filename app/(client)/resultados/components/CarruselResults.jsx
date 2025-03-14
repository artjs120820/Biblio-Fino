"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import BookCard from "./BookCard";
import { motion, AnimatePresence } from "framer-motion";
import { useUser } from "../../../context/UserContext";

export default function ResultsCarousel({ onBack, data, searchTerm, page, totalPages }) {
    const { filters} = useUser();
    const router = useRouter();
    const setPageWithUrl = (newPage) => {
        if (isNaN(newPage) || newPage < 1) return;
        router.push(`/resultados/${encodeURIComponent(searchTerm)}?page=${newPage}`);
    };

    const handleBookClick = (book) => {
        router.push(`/${encodeURIComponent(book.Titulo)}`);
    };

    const nextPage = () => setPageWithUrl(page + 1);
    const prevPage = () => setPageWithUrl(page - 1);
    return (
        <>
            {data.length === 0 ? (
                <div className="flex justify-center items-center flex-col h-full py-12">
                    <div className="text-center">
                        <p className="text-3xl font-semibold text-gray-700 mb-4">Ups, no encontramos resultados</p>
                        <div className="flex justify-center items-center mt-6 animate-bounce">
                            <span className="text-8xl text-gray-500">😞</span>
                        </div>
                    </div>
                    <div className="mt-8">
                        <button
                            onClick={onBack}
                            className="px-6 py-3 text-white font-medium bg-gradient-to-r from-cyan-600 to-cyan-800 hover:from-cyan-500 hover:to-cyan-700 rounded-lg shadow-md transform transition-all duration-300 hover:scale-105"
                        >
                            Volver a buscar
                        </button>
                    </div>
                </div>

            ) : (
                <>
                    <div className="relative overflow-hidden w-full mt-6 mb-12">
                        <div
                            className="flex transition-transform duration-700 ease-in-out"
                        >
                            <div className="relative overflow-hidden w-full mt-6 mb-12">
                                <AnimatePresence>
                                    <div className="flex flex-wrap justify-start">

                                        {data.map((book, index) => (
                                            <motion.div
                                                key={index}
                                                className="w-1/3 flex-shrink-0 px-4"
                                                onClick={() => handleBookClick(book)}
                                                initial={{ opacity: 0, y: -30, scale: 0.9 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: -30, scale: 0.9 }}
                                                transition={{ duration: 0.3, ease: "easeInOut"}}
                                            >
                                                <BookCard book={book} filters={filters} />
                                            </motion.div>
                                        ))}
                                    </div>
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <div>
                            <button
                                onClick={onBack}
                                className="px-6 py-3 text-white font-medium bg-gradient-to-r from-cyan-600 to-cyan-800 hover:from-cyan-500 hover:to-cyan-700 rounded-lg shadow-md transform transition-all duration-300 hover:scale-105"
                            >
                                Volver a buscar
                            </button>
                        </div>
                        <div className="flex justify-end items-center gap-3">
                            <button
                                onClick={prevPage}
                                className={`text-white px-4 py-2 rounded-full transition-all duration-300
                        ${page === 1 ? "bg-gray-400 text-gray-300 cursor-not-allowed" : "bg-cyan-800 hover:bg-cyan-700"}`}
                                disabled={page === 1}
                            >
                                Anterior
                            </button>

                            <span>Página {page} de {totalPages}</span>

                            <button
                                onClick={nextPage}
                                className={`text-white px-4 py-2 rounded-full transition-all duration-300
                        ${page === totalPages ? "bg-gray-400 text-gray-300 cursor-not-allowed" : "bg-cyan-800 hover:bg-cyan-700"}`}
                                disabled={page === totalPages}
                            >
                                Siguiente
                            </button>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}
