"use client";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useUser } from "../../../context/UserContext";
import Link from "next/link";
import ApiCopia from "../../../api/copia";

export default function BookInfo() {
    const { user } = useUser();
    const { id } = useParams();
    const idCopia = decodeURIComponent(id);
    const router = useRouter();

    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const response = await ApiCopia.devolverLibro(idCopia);
                if (response.data.success) {
                    setBook(response.data.copia);
                }
            } catch (error) {
                console.error("Error fetching book data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchBook();
    }, [idCopia]);

    const handleBackClick = () => {
        router.back();
    };

    if (loading) return <p>Cargando...</p>;
    if (!book) {
        return (
            <div>
                <h2>No se encontró el libro</h2>
                <button
                    onClick={handleBackClick}
                    className="mt-6 px-6 py-2 bg-cyan-800 text-white font-semibold rounded-full shadow-md hover:bg-cyan-700 transition-all"
                >
                    Ir a la página principal
                </button>
            </div>
        );
    }

    return (
        <div className="bg-white shadow-2xl rounded-3xl py-8 px-10 w-full max-w-3xl mx-auto transition-all duration-500">
            <div className="flex flex-col items-center">
                <img
                    src={book.imagen}
                    alt={book.libro.titulo}
                    className="w-64 h-64 object-cover rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105"
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/busqueda/default.jpg";
                    }}
                />
                <h2 className="text-4xl font-extrabold text-gray-900 mt-5 mb-3 text-center">
                    {book.libro.titulo}
                </h2>
                <p className="text-lg text-gray-700 italic text-center">{book.libro.genero} | {book.idioma}</p>

                <div className="mt-6 border-t border-gray-300 w-full"></div>

                <div className="w-full mt-4 space-y-2">
                    <p className="text-lg"><strong className="text-cyan-700">Autor:</strong> {book.libro.autor}</p>
                    <p className="text-lg"><strong className="text-cyan-700">Editorial:</strong> {book.editorial}</p>
                    <p className="text-lg"><strong className="text-cyan-700">Año:</strong> {book.anio}</p>
                    <p className="text-lg"><strong className="text-cyan-700">Páginas:</strong> {book.paginas}</p>
                    <p className="text-lg"><strong className="text-cyan-700">Código Único:</strong> {book.codigo_unico}</p>
                    <p className="text-lg"><strong className="text-cyan-700">ISBN:</strong> {book.isbn}</p>
                    <p className="text-lg"><strong className="text-cyan-700">Disponible:</strong> <span className={`font-semibold ${book.disponible ? 'text-green-600' : 'text-red-600'}`}>{book.disponible ? "Sí" : "No"}</span></p>
                </div>

                {book.descripcion && (
                    <p className="mt-6 text-gray-600 leading-relaxed text-justify border-l-4 border-cyan-500 pl-4 italic">
                        {book.descripcion}
                    </p>
                )}

                <div className="flex flex-col sm:flex-row mt-6 gap-4 w-full">
                    <button
                        onClick={handleBackClick}
                        className="px-6 py-2 bg-cyan-800 text-white font-semibold rounded-full shadow-md hover:bg-cyan-700 transition-all w-full sm:w-auto"
                    >
                        ⬅ Volver
                    </button>
                    {user?.tipo && ["admin", "usuario"].includes(user.tipo) && (
                        <Link
                            href={`/${user.tipo === "admin" ? "editarLibro" : "reservaLibro"}/${encodeURIComponent(book.libro.titulo)}`}
                            className="bg-teal-800 text-white px-6 py-2 rounded-full hover:bg-teal-600 transition font-semibold text-center w-full sm:w-auto"
                        >
                            {user.tipo === "admin" ? "Editar Libro" : "Reservar Libro"}
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}
