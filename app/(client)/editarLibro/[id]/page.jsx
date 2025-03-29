"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import ApiCopia from "../../../api/copia";

export default function EditarLibro() {
    const { id } = useParams();
    const idCopia = decodeURIComponent(id);
    const router = useRouter();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [imagenError, setImagenError] = useState(false);

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
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(book);
    };
    const handleInputChange = (key, value) => {
        setLibro((prev) => ({ ...prev, [key]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setLibro((prev) => ({ ...prev, imagen: URL.createObjectURL(file) }));
        }
    };

    return (
        <div className="p-6 bg-white shadow-lg rounded-lg">
            <div className="flex flex-row items-center justify-between mb-3">
                <h1 className="text-2xl font-bold text-gray-800">Editar Libro</h1>
                <button onClick={() => router.back()} className="bg-slate-500 text-white px-4 py-2 rounded-full hover:bg-slate-600 transition">
                    Volver
                </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex gap-6 ">
                    <div className="flex-[50%] flex flex-col gap-4">
                        {[
                            { label: "Título", key: "titulo", nested: true },
                            { label: "Género", key: "genero", nested: true },
                            { label: "Autor", key: "autor", nested: true },
                            { label: "ISBN", key: "isbn", nested: false }
                        ].map((field) => (
                            <div key={field.key} className="flex flex-col">
                                <label className="font-medium text-gray-700">{field.label}</label>
                                <input
                                    type="text"
                                    value={field.nested ? book.libro?.[field.key] || "" : book?.[field.key] || ""}
                                    onChange={(e) => handleInputChange(field.key, e.target.value, field.nested)}
                                    placeholder="No hay información al respecto"
                                    className="w-full p-2 border rounded focus:ring focus:ring-blue-200 placeholder-gray-400 text-gray-700"
                                />
                            </div>
                        ))}
                        <div className="flex gap-4">
                            <div className="flex-1">
                                <label className="font-medium text-gray-700">Año de Publicación</label>
                                <input
                                    type="number"
                                    value={book.anio || ""}
                                    onChange={(e) => handleInputChange("anio", e.target.value)}
                                    placeholder="No hay información"
                                    className="w-full p-2 border rounded focus:ring focus:ring-blue-200 placeholder-gray-400 text-gray-700"
                                />
                            </div>
                            <div className="flex-1">
                                <label className="font-medium text-gray-700">Idioma</label>
                                <input
                                    type="text"
                                    value={book.idioma || ""}
                                    onChange={(e) => handleInputChange("idioma", e.target.value)}
                                    placeholder="No hay información"
                                    className="w-full p-2 border rounded focus:ring focus:ring-blue-200 placeholder-gray-400 text-gray-700"
                                />
                            </div>
                        </div>
                        {[
                            { label: "Editorial", key: "editorial" },
                            { label: "Número de Páginas", key: "paginas" }
                        ].map((field, index) => (
                            <div key={index} className="flex flex-col">
                                <label className="font-medium text-gray-700">{field.label}</label>
                                <input
                                    type={field.key === "paginas" ? "number" : "text"}
                                    value={book[field.key] || ""}
                                    onChange={(e) => handleInputChange(field.key, e.target.value)}
                                    placeholder="No hay información al respecto"
                                    className="w-full p-2 border rounded focus:ring focus:ring-blue-200 placeholder-gray-400 text-gray-700"
                                />
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-col items-center gap-4 flex-[50%]">
                        <label className="text-lg font-extrabold text-gray-800">Imagen del Libro</label>
                        <label className="w-[23rem] h-[28rem] border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50 cursor-pointer hover:border-blue-400 transition shadow-lg relative overflow-hidden">
                            {book.imagen && !imagenError ? (
                                <img
                                    src={book.imagen}
                                    alt="Vista previa"
                                    className="w-full h-full object-cover rounded-md hover:scale-105 transition-transform"
                                    onError={() => setImagenError(true)}
                                />
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ type: "spring", stiffness: 100, damping: 8 }}
                                    className="text-gray-500 text-center flex flex-col items-center"
                                >
                                    <span className="text-sm">No se pudo encontrar la URL de la imagen. Por favor, suba una nueva.</span>
                                </motion.div>
                            )}
                            <input id="imagen" type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                        </label>
                    </div>
                </div>
                <hr className="border-gray-300 my-6" />
                <div className="flex justify-start gap-4">
                    <button type="button" className="bg-gray-400 text-white px-6 py-2 rounded hover:bg-gray-500 transition">
                        Cancelar
                    </button>
                    <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition">
                        Guardar Cambios
                    </button>
                </div>
            </form>
        </div>
    );
}   