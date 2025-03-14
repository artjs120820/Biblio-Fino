"use client";
import Link from "next/link";
import { useState } from "react";

export default function Agregar() {
    const [titulo, setTitulo] = useState("");
    const [autor, setAutor] = useState("");
    const [genero, setGenero] = useState("");
    const [isbn, setIsbn] = useState("");
    const [anio, setAnio] = useState("");
    const [idioma, setIdioma] = useState("");
    const [editorial, setEditorial] = useState("");
    const [paginas, setPaginas] = useState("");
    const [imagen, setImagen] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ titulo, autor, genero, isbn, anio, idioma, editorial, paginas, imagen });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImagen(URL.createObjectURL(file));
        }
    };

    const handleRemoveImage = () => {
        setImagen(null);
        document.getElementById("imagen").value = "";
    };

    return (
        <div className="p-6 bg-white shadow-lg rounded-lg ">
            <div className="flex flex-row items-center justify-between mb-3">
                <h1 className="text-2xl font-bold text-gray-800">Agregar Nuevo Libro</h1>
                <Link href="/" className="bg-slate-500 text-white px-4 py-2 rounded-full hover:bg-slate-600 transition">
                    Volver
                </Link>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div>
                            <label className="block font-medium text-gray-700">Título</label>
                            <input
                                type="text"
                                value={titulo}
                                onChange={(e) => setTitulo(e.target.value)}
                                className="w-full p-2 border rounded focus:ring focus:ring-blue-200"
                                required
                            />
                        </div>
                        <div>
                            <label className="block font-medium text-gray-700">Autor</label>
                            <input
                                type="text"
                                value={autor}
                                onChange={(e) => setAutor(e.target.value)}
                                className="w-full p-2 border rounded focus:ring focus:ring-blue-200"
                                required
                            />
                        </div>
                        <div>
                            <label className="block font-medium text-gray-700">Género</label>
                            <input
                                type="text"
                                value={genero}
                                onChange={(e) => setGenero(e.target.value)}
                                className="w-full p-2 border rounded focus:ring focus:ring-blue-200"
                                required
                            />
                        </div>
                        <div>
                            <label className="block font-medium text-gray-700">ISBN</label>
                            <input
                                type="text"
                                value={isbn}
                                onChange={(e) => setIsbn(e.target.value)}
                                className="w-full p-2 border rounded focus:ring focus:ring-blue-200"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block font-medium text-gray-700">Año de Publicación</label>
                                <input
                                    type="number"
                                    value={anio}
                                    onChange={(e) => setAnio(e.target.value)}
                                    className="w-full p-2 border rounded focus:ring focus:ring-blue-200"
                                />
                            </div>
                            <div>
                                <label className="block font-medium text-gray-700">Idioma</label>
                                <input
                                    type="text"
                                    value={idioma}
                                    onChange={(e) => setIdioma(e.target.value)}
                                    className="w-full p-2 border rounded focus:ring focus:ring-blue-200"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block font-medium text-gray-700">Editorial</label>
                            <input
                                type="text"
                                value={editorial}
                                onChange={(e) => setEditorial(e.target.value)}
                                className="w-full p-2 border rounded focus:ring focus:ring-blue-200"
                            />
                        </div>
                        <div>
                            <label className="block font-medium text-gray-700">Número de Páginas</label>
                            <input
                                type="number"
                                value={paginas}
                                onChange={(e) => setPaginas(e.target.value)}
                                className="w-full p-2 border rounded focus:ring focus:ring-blue-200"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col items-center space-y-4">
                        <label className="text-lg font-extrabold text-gray-800 ">Imagen del Libro</label>
                        <label
                            htmlFor="imagen"
                            className="w-[23rem] h-[28rem] border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50 cursor-pointer hover:border-blue-400 transition shadow-lg relative overflow-hidden"
                        >
                            {imagen ? (
                                <img
                                    src={imagen}
                                    alt="Vista previa"
                                    className="w-full h-full object-cover rounded-md hover:scale-105 transition-transform"
                                />
                            ) : (
                                <div className="text-gray-500 text-center flex flex-col items-center">
                                    <svg className="w-12 h-12 text-gray-400 mb-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M7 16V7a4 4 0 018 0v9m4 0a2 2 0 01-2 2H7a2 2 0 01-2-2h14z" />
                                    </svg>
                                    <span className="text-sm">Subir imagen</span>
                                </div>
                            )}
                            <input
                                id="imagen"
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                            />
                        </label>
                        <div className="flex gap-2">
                            <label htmlFor="imagen" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition text-sm cursor-pointer">
                                Elegir Imagen
                            </label>
                            {imagen && (
                                <button
                                    type="button"
                                    onClick={handleRemoveImage}
                                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition text-sm flex items-center gap-1"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                    Eliminar
                                </button>
                            )}
                        </div>
                    </div>

                </div>

                <hr className="border-gray-300 my-6" />
                <div className="flex justify-start gap-4">
                    <button type="button" className="bg-gray-400 text-white px-6 py-2 rounded hover:bg-gray-500 transition">
                        Cancelar
                    </button>
                    <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition">
                        Guardar Libro
                    </button>
                </div>
            </form>
        </div>
    );
}
