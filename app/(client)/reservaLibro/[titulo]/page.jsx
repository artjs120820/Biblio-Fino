"use client";
import { useParams, useRouter } from "next/navigation";

export default function BookInfo() {
    const { titulo } = useParams();
    const decodedTitulo = decodeURIComponent(titulo);
    const router = useRouter();
    return (
        <>
            <button
                onClick={() => { router.back() }}
                className="px-6 py-2 bg-cyan-800 text-white font-semibold rounded-full shadow-md hover:bg-cyan-700 transition-all"
            >
                Volver
            </button>
            <h1>Reserva tu Libro - {decodedTitulo}</h1>
        </>
    )
}