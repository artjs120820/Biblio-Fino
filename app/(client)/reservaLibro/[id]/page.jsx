"use client";
import { useParams, useRouter } from "next/navigation";

export default function BookInfo() {
    const { id } = useParams();
    const decodedId = decodeURIComponent(id);
    const router = useRouter();
    return (
        <>
            <button
                onClick={() => { router.back() }}
                className="px-6 py-2 bg-cyan-800 text-white font-semibold rounded-full shadow-md hover:bg-cyan-700 transition-all"
            >
                Volver
            </button>
            <h1>Reserva tu Libro - {decodedId}</h1>
        </>
    )
}