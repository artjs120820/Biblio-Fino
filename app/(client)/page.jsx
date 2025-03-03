"use client"
import { useState } from "react";

export default function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    title: false,
    authors: false,
    series: false,
    isbn: false,
  });

  const handleClear = () => {
    setSearchTerm("");
    setFilters({ title: false, authors: false, series: false, isbn: false });
  };

  return (
    <div className="p-8 ">
      <h1 className="text-2xl font-bold mb-4">Búsqueda</h1>
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
              placeholder="Buscar por título"
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
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" checked={filters.title} onChange={() => setFilters({ ...filters, title: !filters.title })} /> Título
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" checked={filters.authors} onChange={() => setFilters({ ...filters, authors: !filters.authors })} /> Autor, Autores
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" checked={filters.series} onChange={() => setFilters({ ...filters, series: !filters.series })} /> Serie
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" checked={filters.isbn} onChange={() => setFilters({ ...filters, isbn: !filters.isbn })} /> ISBN
              </label>
            </div>
          </div>
          <div className="flex gap-4">
            <button onClick={handleClear} className="bg-slate-500 text-white px-4 py-2 rounded-full hover:bg-slate-600 transition">
              Limpiar
            </button>
            <button className="bg-slate-500 text-white px-4 py-2 rounded-full hover:bg-slate-600 transition">
              Buscar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
