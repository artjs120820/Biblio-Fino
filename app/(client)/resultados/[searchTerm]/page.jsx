"use client";
import ResultsCarousel from "../components/CarruselResults";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useCallback, useState } from "react";

import copiaApi from "../../../api/copia"; // Importa tu API correctamente

export default function Resultados() {
    const router = useRouter();
    const params = useParams();
    const searchParams = useSearchParams();
    const searchTerm = decodeURIComponent(params?.searchTerm || "");
    const page = parseInt(searchParams.get("page")) || 1;
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [books, setBooks] = useState([]);
    const [totalPages, setTotalPages] = useState(1);


    useEffect(() => {
        if (!searchTerm) {
            router.replace("/");
            return;
        }
        const fetchBooks = async () => {
            setLoading(true);
            setError(null);
    
            try {
                const response = await copiaApi.busqueda(searchTerm, page);
                setBooks(response.data.copias);
                setTotalPages(Math.ceil(response.data.total_copias / 3));
            } catch (err) {
                console.error("Error al obtener los libros:", err);
                setError("Error al obtener los libros");
            } finally {
                setLoading(false);
            }
        };
    
        fetchBooks();
    }, [searchTerm, page]);

    return (
        <div className="relative w-full">
            <h1 className="text-2xl font-bold text-center">Búsqueda - Resultados</h1>

            {loading && <p className="text-center text-gray-500">Cargando...</p>}
            {error && <p className="text-center text-red-500">{error}</p>}

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

    // useEffect(() => {
    //     if (!searchTerm) {
    //         router.replace("/"); 
    //         return;
    //     }
    //     const normalizedSearch = searchTerm.toLowerCase();
    //     const results = data.filter((book) =>
    //         book.Titulo.toLowerCase().includes(normalizedSearch) ||
    //         (filters.authors && book["Autor(es)"].toLowerCase().includes(normalizedSearch)) ||
    //         (filters.series && book.Serie.toLowerCase().includes(normalizedSearch)) ||
    //         (filters.isbn && book.ISBN13.includes(normalizedSearch))
    //     );

    //     memoizedUpdateFilteredBooks(results);
    // }, [searchTerm, filters, memoizedUpdateFilteredBooks]);    
    // return (
    //     <div className="relative w-full">
    //         <h1 className="text-2xl font-bold text-center">Búsqueda - Resultados</h1>
    //         <ResultsCarousel
    //             data={filteredBooks}
    //             page={page}
    //             onBack={() => router.push(`/`)}
    //             filters={filters}
    //             searchTerm={searchTerm}
    //         />
    //     </div>
    // );