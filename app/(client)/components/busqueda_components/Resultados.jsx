import { useState } from "react";
import BookCard from "./BookCard";
import BookInfo from "./BookInfo";

export default function ResultsCarousel({ onBack, filters, data }) {
    console.log(data)
    const [page, setPage] = useState(0);
    const itemsPerPage = 3;
    const [selectedBook, setSelectedBook] = useState(null);

    const totalPages = Math.ceil(data.length / itemsPerPage);

    const nextPage = () => {
        setPage((prev) => (prev + 1) % totalPages);
    };

    const prevPage = () => {
        setPage((prev) => (prev - 1 + totalPages) % totalPages);
    };
    if (selectedBook) {
        return <BookInfo book={selectedBook} onBack={() => setSelectedBook(null)} />;
    }
    return (
        <div className="relative w-full">
            <h1 className="text-2xl font-bold text-center">Búsqueda - Resultados</h1>
            <div className="relative overflow-hidden w-full mt-6 mb-12">
                <div
                    className="flex transition-transform duration-700 ease-in-out"
                    style={{ transform: `translateX(-${page * 100}%)` }}
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
        ${page === 0 ? "bg-gray-400 text-gray-300 cursor-not-allowed" : "bg-cyan-800 hover:bg-cyan-700"}
    `}
                        disabled={page === 0}
                    >
                        Anterior
                    </button>

                    <span>Página {page + 1} de {totalPages}</span>
                    <button
                        onClick={nextPage}
                        className={`text-white px-4 py-2 rounded-full transition-all duration-300
        ${page === totalPages - 1 ? "bg-gray-400 text-gray-300 cursor-not-allowed" : "bg-cyan-800 hover:bg-cyan-700"}
    `}
                        disabled={page === totalPages - 1}
                    >
                        Siguiente
                    </button>
                </div>
            </div>
        </div>
    );
}
