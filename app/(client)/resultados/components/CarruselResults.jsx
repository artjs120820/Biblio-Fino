

"use client";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import BookCard from "./BookCard";
import BookInfo from "./BookInfo";

export default function ResultsCarousel({ onBack, filters, data, searchTerm, page }) {
    const router = useRouter();
    const itemsPerPage = 3;
    const [books, setBooks] = useState(data);

    useEffect(() => {
        if (data.length > 0) {
            setBooks(data);
            localStorage.setItem("filteredBooks", JSON.stringify(data));
        } else {
            const storedBooks = localStorage.getItem("filteredBooks");
            if (storedBooks) {
                setBooks(JSON.parse(storedBooks));
            }
        }
    }, [data]);

    const totalPages = Math.max(1, Math.ceil(books.length / itemsPerPage)); 

    const redirectIfPageExceedsTotal = () => {
        if (page > totalPages) {
            router.replace(`/resultados/${encodeURIComponent(searchTerm)}?page=${totalPages}`);
        } else if (page <= 0) {
            router.replace(`/resultados/${encodeURIComponent(searchTerm)}?page=1`);
        } else {
            router.replace(`/resultados/${encodeURIComponent(searchTerm)}?page=${page}`);
        }
    };

    useEffect(() => {
        redirectIfPageExceedsTotal();
    }, [page, totalPages]); 


    const setPageWithUrl = (newPage) => {
        if (isNaN(newPage) || newPage < 1) return;
        router.push(`/resultados/${encodeURIComponent(searchTerm)}?page=${newPage}`);
    };

    const [selectedBook, setSelectedBook] = useState(null);
    if (selectedBook) {
        return <BookInfo book={selectedBook} onBack={() => setSelectedBook(null)} />;
    }

    const nextPage = () => setPageWithUrl(page + 1);
    const prevPage = () => setPageWithUrl(page - 1);

    return (
        <>
            <div className="relative overflow-hidden w-full mt-6 mb-12">
                <div
                    className="flex transition-transform duration-700 ease-in-out"
                    style={{ transform: `translateX(-${(page - 1) * 100}%)` }}
                >
                    {data.map((book, index) => (
                        <div key={index} className="w-1/3 flex-shrink-0 px-4" onClick={() => setSelectedBook(book)}>
                            <BookCard book={book} filters={filters} />
                        </div>
                    ))}
                </div>
            </div>
            {/* Controles */}
            <div className="flex justify-between">
                <div>
                    <button onClick={onBack} className="border px-4 py-2 rounded">
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
    );
}
