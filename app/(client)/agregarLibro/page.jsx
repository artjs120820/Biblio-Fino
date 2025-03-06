"use client"
import Link from "next/link";
import { useState } from "react";

export default function Agregar() {
    const [titulo, setTitulo] = useState("");
    const [autor, setAutor] = useState("");
    const [genero, setGenero] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ titulo, autor, genero });
        // Aquí podrías agregar la lógica para enviar los datos a una API o base de datos
    };

    return (
        <div className="max-w-lg mx-auto p-4 bg-white shadow-lg rounded-lg">
            <Link href="/" className="bg-slate-500 text-white px-4 py-2 rounded-full hover:bg-slate-600 transition">
                Buscar
            </Link>
            <h1 className="text-2xl font-bold my-4">Agregar Nuevo Libro</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block font-medium">Título</label>
                    <input 
                        type="text" 
                        value={titulo} 
                        onChange={(e) => setTitulo(e.target.value)} 
                        className="w-full p-2 border rounded" 
                        required 
                    />
                </div>
                <div>
                    <label className="block font-medium">Autor</label>
                    <input 
                        type="text" 
                        value={autor} 
                        onChange={(e) => setAutor(e.target.value)} 
                        className="w-full p-2 border rounded" 
                        required 
                    />
                </div>
                <div>
                    <label className="block font-medium">Género</label>
                    <input 
                        type="text" 
                        value={genero} 
                        onChange={(e) => setGenero(e.target.value)} 
                        className="w-full p-2 border rounded" 
                        required 
                    />
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition">
                    Guardar Libro
                </button>
            </form>
        </div>
    );
}
