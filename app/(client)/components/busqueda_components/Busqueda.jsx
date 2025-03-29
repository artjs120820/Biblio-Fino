import Aviso from "../../components/Aviso"
import { useState } from "react";
import Link from "next/link";
import { useToken } from "../../../context/tokenContext";
import { useUser } from "../../../context/UserContext";



export default function SearchPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const { filters, updateFilters } = useUser();
    const [avisoVisible, setAvisoVisible] = useState(false);
    const { tokenData } = useToken();
    const handleClear = () => {
        setSearchTerm("");
        updateFilters({ authors: false, genero: false, isbn: false });
    };

    const handleLocalSearch = (e) => {
        if (!searchTerm.trim()) {
            setAvisoVisible(true);
            setTimeout(() => setAvisoVisible(false), 3000);
            e.preventDefault();
        }
    };
    return (
        <div>
            <div className="flex flex-row justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Búsqueda</h1>
                {tokenData?.tipo_usuario === "administrador" ? (
                    <Link href="/agregarLibro" className="bg-teal-800 text-white px-4 py-2 rounded-full hover:bg-teal-600 transition">
                        Añadir un nuevo recurso
                    </Link>
                ) : null}
            </div>
            <div className="bg-blue-200 p-6 rounded-lg flex gap-8">
                <div className="flex-[60%]">

                    <label className="block font-semibold mb-1" htmlFor="search">
                        Ingresa la palabra clave
                    </label>



                    <div className="relative">
                        <span className="absolute inset-y-0 left-3 flex items-center text-gray-600">
                            🔍
                        </span>
                        <input
                            id="search"
                            type="text"
                            placeholder="Buscar..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full border rounded-md pl-10 p-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
                        />
                    </div>
                </div>
                <div className="flex-[40%] flex flex-col">
                    <div className="mb-4">
                        <p className="font-semibold">Incluir búsqueda en:</p>
                        <div className="flex flex-col gap-2 mt-2">
                            {["authors", "genero", "isbn"].map((key) => (
                                <label key={key} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        className="mr-2"
                                        checked={filters[key]}
                                        onChange={() => updateFilters({ ...filters, [key]: !filters[key] })}
                                    />
                                    {key === "authors" ? "Autor(es)" : key.charAt(0).toUpperCase() + key.slice(1)}
                                </label>
                            ))}

                        </div>
                    </div>
                    <div className="flex gap-4">
                        <button onClick={handleClear} className="bg-slate-500 text-white px-4 py-2 rounded-full hover:bg-slate-600 transition">
                            Limpiar
                        </button>
                        <Link
                            href={searchTerm.trim() ? `/resultados/${encodeURIComponent(searchTerm)}?page=1` : "#"}
                            onClick={handleLocalSearch}
                        >

                            <button className="bg-slate-500 text-white px-4 py-2 rounded-full hover:bg-slate-600 transition">
                                Buscar
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
            <Aviso mensaje="Por favor escribe alguna referencia" visible={avisoVisible} />
        </div>
    );
}
