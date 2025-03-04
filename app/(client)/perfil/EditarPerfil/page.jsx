"use client";

import { useUser } from "../../../context/UserContext";
import { useState } from "react";
import Link from "next/link";

export default function EditarPerfil() {
    const { user } = useUser();

    if (!user) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen text-center">
                <h1 className="text-3xl font-bold mb-4">⚠ No has iniciado sesión</h1>
                <p className="text-gray-600">Por favor, inicia sesión para editar tu perfil.</p>
            </div>
        );
    }

    const [nombre, setNombre] = useState(user.nombre || "");
    const [correo, setCorreo] = useState(user.correo || "");
    const [descripcion, setDescripcion] = useState(user.descripcion || "");
    const [foto, setFoto] = useState(user.foto || "/busqueda/default.jpg");
    const [fotoFile, setFotoFile] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFoto(URL.createObjectURL(file));
            setFotoFile(file);
        }
    };

    const handleGuardar = () => {
        alert("✅ Perfil actualizado con éxito");
    };

    return (
        <>
            <div className="flex items-center mb-6 justify-between ">
                <h1 className="text-4xl font-bold">Hola, {nombre} 👋</h1>
                <Link
                    href="/perfil"
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
                >
                    🔙 Volver al perfil
                </Link>
            </div>
            <div className="mx-auto flex flex-row items-center gap-6">
                <div className="relative flex-shrink-0 w-[350px] h-[300px] border-4 border-gray-300 rounded-xl overflow-hidden flex items-center justify-center">
                    <img src={foto} alt="Foto de perfil" className="w-full h-full object-cover" />
                    <label className="absolute inset-0 p-10 text-center bg-black/50 flex items-center justify-center text-white text-lg font-semibold opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                        Para cambiar la imagen, da clic
                        <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                    </label>
                </div>

                {/* Formulario de edición */}
                <div className="w-full bg-gray-100 p-6 rounded-lg shadow-lg">
                    <label className="block text-gray-700 font-semibold">📛 Nombre</label>
                    <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />

                    <label className="block text-gray-700 font-semibold">📧 Correo</label>
                    <input
                        type="email"
                        className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                        value={correo}
                        onChange={(e) => setCorreo(e.target.value)}
                    />

                    <label className="block text-gray-700 font-semibold">📝 Descripción</label>
                    <textarea
                        className="w-full p-2 border border-gray-300 rounded-lg mb-4 resize-none"
                        rows="3"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                    ></textarea>

                    <button
                        onClick={handleGuardar}
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition font-semibold"
                    >
                        💾 Guardar Cambios
                    </button>
                </div>
            </div>
        </>
    );
}
