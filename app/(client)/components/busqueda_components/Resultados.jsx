import { useState } from "react";
import BookCard from "./BookCard";

const data = [
    {
        "Titulo": "El gato sin botas",
        "Autor(es)": "Autor 1",
        "Serie": "Serie 1",
        "ISBN13": "1202002",
        "Imagen": "https://i.blogs.es/8bddcc/650_1000_650_1000_minecraft/450_1000.jpg"
    },
    {
        "Titulo": "El zorro con botas",
        "Autor(es)": "Autor 2",
        "Serie": "Serie 2",
        "ISBN13": "4532112",
        "Imagen": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqBa0jK2UCaVG_gD0VL5IV1WXl0ExM9YSxdA&s"
    },
    {
        "Titulo": "El perro con chaqueta",
        "Autor(es)": "Autor 3",
        "Serie": "Serie 3",
        "ISBN13": "9876543",
        "Imagen": "https://via.placeholder.com/150"
    },
    {
        "Titulo": "FDOtro libro más",
        "Autor(es)": "Autor 4",
        "Serie": "Serie 4",
        "ISBN13": "1122334",
        "Imagen": "https://via.placeholder.com/150"
    },
    {
        "Titulo": "DGDOtro libro más",
        "Autor(es)": "Autor 4",
        "Serie": "Serie 4",
        "ISBN13": "1122334",
        "Imagen": "https://via.placeholder.com/150"
    },
    {
        "Titulo": "2DFDFDOtro libro más",
        "Autor(es)": "Autor 4",
        "Serie": "Serie 4",
        "ISBN13": "1122334",
        "Imagen": "https://via.placeholder.com/150"
    },
    {
        "Titulo": "ODFDtro libro más",
        "Autor(es)": "Autor 4",
        "Serie": "Serie 4",
        "ISBN13": "1122334",
        "Imagen": "https://articles.geekster.in/wp-content/uploads/2024/06/How-to-Connect-Tailwind-in-HTML-.jpg"
    },
    {
        "Titulo": "223DFDOtro libro más",
        "Autor(es)": "Autor 4",
        "Serie": "Serie 4",
        "ISBN13": "1122334",
        "Imagen": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxzg0DaCSOAnLTbkak5Un9NTFDjLL0wlHFmQ&s"
    },
    {
        "Titulo": "HFGFGFGFOtro libro más",
        "Autor(es)": "Autor 4",
        "Serie": "Serie 4",
        "ISBN13": "1122334",
        "Imagen": "https://via.placeholder.com/150"
    },
];

export default function ResultsCarousel({ onBack, filters }) {
    const [page, setPage] = useState(0);
    const itemsPerPage = 3;
    const totalPages = Math.ceil(data.length / itemsPerPage);

    const nextPage = () => {
        setPage((prev) => (prev + 1) % totalPages);
    };

    const prevPage = () => {
        setPage((prev) => (prev - 1 + totalPages) % totalPages);
    };

    return (
        <div className="relative w-full">
            <h1 className="text-2xl font-bold text-center">Búsqueda - Resultados</h1>
            <div className="relative overflow-hidden w-full mt-6 mb-12">
                <div
                    className="flex transition-transform duration-700 ease-in-out"
                    style={{ transform: `translateX(-${page * 100}%)` }}
                >
                    {data.map((book, index) => (
                        <div key={index} className="w-1/3 flex-shrink-0 px-4">
                            <BookCard book={book} filters={filters} />
                        </div>
                    ))}
                </div>
            </div>
            {/* Controles */}
            <div className="flex justify-between">
                <div>
                    <button onClick={onBack} className="border px-4 py-2 rounded">
                        Volver a buscar
                    </button>
                </div>
                <div className="flex justify-end items-center gap-3">
                    <button
                        onClick={prevPage}
                        className={`bg-slate-800 text-white px-4 py-2 rounded-full ${page === 0 ? 'bg-gray-500 text-gray-300 cursor-not-allowed' : ''}`}
                        disabled={page === 0}
                    >
                        Anterior
                    </button>
                    <span>Página {page + 1} de {totalPages}</span>
                    <button
                        onClick={nextPage}
                        className={`bg-slate-800 text-white px-4 py-2 rounded-full ${page === totalPages - 1 ? 'bg-gray-500 text-gray-300 cursor-not-allowed' : ''}`}
                        disabled={page === totalPages - 1}
                    >
                        Siguiente
                    </button>
                </div>
            </div>
        </div>
    );
}
