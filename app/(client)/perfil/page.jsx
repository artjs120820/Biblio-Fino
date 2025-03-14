"use client";

import { useToken } from "../../context/tokenContext";
import { useState, useEffect } from "react";
import Link from "next/link";
import reservasApi from "../../api/reserva";
import usuariosApi from "../../api/usuario";

export default function Perfil() {
    const { tokenData } = useToken();
    const [dataReservas, setData] = useState([]);
    const [datosUsuario, setUsuario] = useState(null);
    
    useEffect(() => {
        if (tokenData) {
            obtenerUsuario();
            obtenerReservas();
        }
    }, [tokenData]);

    const obtenerReservas = async () => {
        try {
            console.log(tokenData)
            const response = await reservasApi.obtenerReservas(tokenData.id);
            if (response?.status === 200) {
                setData(response.data.reservas || []);
            } else {
                console.error("Error al obtener reservas:", response?.data?.error || "Error desconocido");
            }
        } catch (error) {
            console.error("Error obteniendo reservas:", error);
        }
    };

    const obtenerUsuario = async () => {
        try {
            const response = await usuariosApi.obtenerDatosCiudadano(tokenData.id);
            if (response?.status === 200) {
                setUsuario(response.data);
            } else {
                console.error("Error al obtener el usuario:", response?.data?.error || "Error desconocido");
            }
        } catch (error) {
            console.error("Error obteniendo el usuario:", error);
        }
    };

    if (!tokenData) {
        return (
            <div className="flex flex-col items-center justify-center text-center">
                <h1 className="text-3xl font-bold mb-4">⚠ No has iniciado sesión</h1>
                <p className="text-gray-600">Por favor, inicia sesión para ver tu perfil.</p>
            </div>
        );
    }

    if (!datosUsuario) {
        return <p className="text-center text-gray-500">Cargando datos...</p>;
    }

    const reservasTotales = dataReservas.length;
    const librosVencidos = dataReservas.filter(libro => libro.estado === "vencido").length;
    const reservasEntregadas = dataReservas.filter(libro => libro.estado === "entregado").length;

    return (
        <div className="w-[100%] mx-auto flex flex-row items-center gap-6">
            <div className="flex flex-col flex-grow">
                <div className="flex items-center mb-6 justify-between">
                    <h1 className="text-4xl font-bold">👤 Mi Perfil</h1>
                    <Link
                        href="/perfil/EditarPerfil"
                        className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
                    >
                        ✏️ Editar Perfil
                    </Link>
                </div>

                <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-6">
                    <p className="text-xl font-semibold">📛 {datosUsuario.ciudadano.nombre}</p>
                    <p className="text-gray-600">📧 {datosUsuario.ciudadano.correo}</p>
                    <p className="text-gray-600">🔹 Rol: {datosUsuario.ciudadano.rol || "Usuario"}</p>
                    <p className="text-gray-600">
                        📅 Miembro desde: {new Date(datosUsuario.usuario.fecha_registro).toLocaleDateString()}
                    </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md mb-6 border-l-4 border-blue-500">
                    <h2 className="text-2xl font-semibold mb-2">📝 Sobre mí</h2>
                    <p className="text-gray-700">
                        {datosUsuario.usuario.descripcion || "Aún no has agregado una descripción. ¡Puedes añadirlo en Editar Perfil!"}
                    </p>
                </div>

                <div className="grid grid-cols-3 gap-6">
                    <div className="bg-blue-100 p-6 rounded-lg text-center shadow-md">
                        <p className="text-3xl font-bold">{reservasTotales}</p>
                        <p className="text-gray-600">Reservas Totales</p>
                    </div>
                    <div className="bg-red-100 p-6 rounded-lg text-center shadow-md">
                        <p className="text-3xl font-bold">{librosVencidos}</p>
                        <p className="text-gray-600">Libros Vencidos</p>
                    </div>
                    <div className="bg-green-100 p-6 rounded-lg text-center shadow-md">
                        <p className="text-3xl font-bold">{reservasEntregadas}</p>
                        <p className="text-gray-600">Reservas Entregadas</p>
                    </div>
                </div>
            </div>

            <div className="flex-shrink-0 w-[400px] h-[250px] border-4 border-gray-300 rounded-xl overflow-hidden flex items-center justify-center">
                <img
                    src={datosUsuario.usuario.foto_url || "/busqueda/default.jpg"}
                    alt="Foto de perfil"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/busqueda/default.jpg";
                    }}
                />
            </div>
        </div>
    );
}
