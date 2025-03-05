"use client";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
const data = [
    {
        "Titulo": "El gato sin botas",
        "Autor(es)": "Autor 1",
        "Serie": "Serie 1",
        "ISBN13": "1202002",
        "Imagen": "https://i.blogs.es/8bddcc/650_1000_650_1000_minecraft/450_1000.jpg",
        "Descripcion": "Un libro sobre ss ssdds ssdds dsdsdsdsdss  sd sd sdsobrssdds dsdsdsdsdss  sd sd sdsobrssdds dsdsdsdsdss  sd sd sdsobrssdds dsdsdsdsdss  sd sd sdsobrssdds dsdsdsdsdss  sd sd sdsobrssdds dsdsdsdsdss  sd sd sdsobrdsdsdsdsdss  sd sd sdsobre un gato sin botassobre un gato sin botassobre un gato sin botassobre un gato sin botassobre un gato sin botasun gato sin botas y sus aventuras."
    },
    {
        "Titulo": "El zorro con botas",
        "Autor(es)": "Autor 2",
        "Serie": "Serie 2",
        "ISBN13": "4532112",
        "Imagen": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXyIQnUNMZQtAKSeXLQnkGFB_5Gx5AlM20Vg&s",
        "Descripcion": "Un libro sobre ss ssdds ssdds dsdsdsdsdss  sd sd sdsobrssdds dsdsdsdsdss  sd sd sdsobrssdds dsdsdsdsdss  sd sd sdsobrssdds dsdsdsdsdss  sd sd sdsobrssdds dsdsdsdsdss  sd sd sdsobrssdds dsdsdsdsdss  sd sd sdsobrdsdsdsdsdss  sd sd sdsobre un gato sin botassobre un gato sin botassobre un gato sin botassobre un gato sin botassobre un gato sin botasun gato sin botas y sus aventuras."

    },
    {
        "Titulo": "El perro con chaqueta",
        "Autor(es)": "Autor 3",
        "Serie": "Serie 3",
        "ISBN13": "9876543",
        "Imagen": "https://via.placeholder.com/150",
        "Descripcion": "Un libro sobre ss ssdds ssdds dsdsdsdsdss  sd sd sdsobrssdds dsdsdsdsdss  sd sd sdsobrssdds dsdsdsdsdss  sd sd sdsobrssdds dsdsdsdsdss  sd sd sdsobrssdds dsdsdsdsdss  sd sd sdsobrssdds dsdsdsdsdss  sd sd sdsobrdsdsdsdsdss  sd sd sdsobre un gato sin botassobre un gato sin botassobre un gato sin botassobre un gato sin botassobre un gato sin botasun gato sin botas y sus aventuras."

    },
    {
        "Titulo": "FDOtro libro más",
        "Autor(es)": "Autor 4",
        "Serie": "Serie 4",
        "ISBN13": "1122334",
        "Imagen": "https://via.placeholder.com/150",
        "Descripcion": "Un libro sobre ss ssdds ssdds dsdsdsdsdss  sd sd sdsobrssdds dsdsdsdsdss  sd sd sdsobrssdds dsdsdsdsdss  sd sd sdsobrssdds dsdsdsdsdss  sd sd sdsobrssdds dsdsdsdsdss  sd sd sdsobrssdds dsdsdsdsdss  sd sd sdsobrdsdsdsdsdss  sd sd sdsobre un gato sin botassobre un gato sin botassobre un gato sin botassobre un gato sin botassobre un gato sin botasun gato sin botas y sus aventuras."

    },
    {
        "Titulo": "DGDOtro libro más",
        "Autor(es)": "Autor 4",
        "Serie": "Serie 4",
        "ISBN13": "1122334",
        "Imagen": "https://via.placeholder.com/150",
        "Descripcion": "Un libro sobre ss ssdds ssdds dsdsdsdsdss  sd sd sdsobrssdds dsdsdsdsdss  sd sd sdsobrssdds dsdsdsdsdss  sd sd sdsobrssdds dsdsdsdsdss  sd sd sdsobrssdds dsdsdsdsdss  sd sd sdsobrssdds dsdsdsdsdss  sd sd sdsobrdsdsdsdsdss  sd sd sdsobre un gato sin botassobre un gato sin botassobre un gato sin botassobre un gato sin botassobre un gato sin botasun gato sin botas y sus aventuras."

    },
    {
        "Titulo": "2DFDFDOtro libro más",
        "Autor(es)": "Autor 4",
        "Serie": "Serie 4",
        "ISBN13": "1122334",
        "Imagen": "https://via.placeholder.com/150",
        "Descripcion": "Un libro sobre ss ssdds ssdds dsdsdsdsdss  sd sd sdsobrssdds dsdsdsdsdss  sd sd sdsobrssdds dsdsdsdsdss  sd sd sdsobrssdds dsdsdsdsdss  sd sd sdsobrssdds dsdsdsdsdss  sd sd sdsobrssdds dsdsdsdsdss  sd sd sdsobrdsdsdsdsdss  sd sd sdsobre un gato sin botassobre un gato sin botassobre un gato sin botassobre un gato sin botassobre un gato sin botasun gato sin botas y sus aventuras."

    },
    {
        "Titulo": "ODFDtro libro más",
        "Autor(es)": "Autor 4",
        "Serie": "Serie 4",
        "ISBN13": "1122334",
        "Imagen": "https://articles.geekster.in/wp-content/uploads/2024/06/How-to-Connect-Tailwind-in-HTML-.jpg",
        "Descripcion": "Un libro sobre ss ssdds ssdds dsdsdsdsdss  sd sd sdsobrssdds dsdsdsdsdss  sd sd sdsobrssdds dsdsdsdsdss  sd sd sdsobrssdds dsdsdsdsdss  sd sd sdsobrssdds dsdsdsdsdss  sd sd sdsobrssdds dsdsdsdsdss  sd sd sdsobrdsdsdsdsdss  sd sd sdsobre un gato sin botassobre un gato sin botassobre un gato sin botassobre un gato sin botassobre un gato sin botasun gato sin botas y sus aventuras."

    },
    {
        "Titulo": "223DFDOtro libro más",
        "Autor(es)": "Autor 4",
        "Serie": "Serie 4",
        "ISBN13": "1122334",
        "Imagen": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxzg0DaCSOAnLTbkak5Un9NTFDjLL0wlHFmQ&s",
        "Descripcion": "Un libro sobre ss ssdds ssdds dsdsdsdsdss  sd sd sdsobrssdds dsdsdsdsdss  sd sd sdsobrssdds dsdsdsdsdss  sd sd sdsobrssdds dsdsdsdsdss  sd sd sdsobrssdds dsdsdsdsdss  sd sd sdsobrssdds dsdsdsdsdss  sd sd sdsobrdsdsdsdsdss  sd sd sdsobre un gato sin botassobre un gato sin botassobre un gato sin botassobre un gato sin botassobre un gato sin botasun gato sin botas y sus aventuras."

    },
    {
        "Titulo": "HFGFGFGFOtro libro más",
        "Autor(es)": "Autor 4",
        "Serie": "Serie 4",
        "ISBN13": "1122334",
        "Imagen": "https://via.placeholder.com/150",
        "Descripcion": "Un libro sobre ss ssdds ssdds dsdsdsdsdss  sd sd sdsobrssdds dsdsdsdsdss  sd sd sdsobrssdds dsdsdsdsdss  sd sd sdsobrssdds dsdsdsdsdss  sd sd sdsobrssdds dsdsdsdsdss  sd sd sdsobrssdds dsdsdsdsdss  sd sd sdsobrdsdsdsdsdss  sd sd sdsobre un gato sin botassobre un gato sin botassobre un gato sin botassobre un gato sin botassobre un gato sin botasun gato sin botas y sus aventuras."

    },
    {
        "Titulo": "HFGFGFGFOtro libro más",
        "Autor(es)": "Autor 4",
        "Serie": "Serie 4",
        "ISBN13": "1122334",
        "Imagen": "https://via.placeholder.com/150",
        "Descripcion": "Un libro sobre ss ssdds ssdds dsdsdsdsdss  sd sd sdsobrssdds dsdsdsdsdss  sd sd sdsobrssdds dsdsdsdsdss  sd sd sdsobrssdds dsdsdsdsdss  sd sd sdsobrssdds dsdsdsdsdss  sd sd sdsobrssdds dsdsdsdsdss  sd sd sdsobrdsdsdsdsdss  sd sd sdsobre un gato sin botassobre un gato sin botassobre un gato sin botassobre un gato sin botassobre un gato sin botasun gato sin botas y sus aventuras."

    },
    {
        "Titulo": "HFGFGFGFOtro libro más",
        "Autor(es)": "Autor 4",
        "Serie": "Serie 4",
        "ISBN13": "1122334",
        "Imagen": "https://via.placeholder.com/150",
        "Descripcion": "Un libro sobre ss ssdds ssdds dsdsdsdsdss  sd sd sdsobrssdds dsdsdsdsdss  sd sd sdsobrssdds dsdsdsdsdss  sd sd sdsobrssdds dsdsdsdsdss  sd sd sdsobrssdds dsdsdsdsdss  sd sd sdsobrssdds dsdsdsdsdss  sd sd sdsobrdsdsdsdsdss  sd sd sdsobre un gato sin botassobre un gato sin botassobre un gato sin botassobre un gato sin botassobre un gato sin botasun gato sin botas y sus aventuras."

    },
];
export default function BookInfo() {
    const { titulo } = useParams(); 
    const decodedTitulo = decodeURIComponent(titulo); 
    const router = useRouter();  

    const [bookFound, setBookFound] = useState(null);

    const book = data.find((b) => b.Titulo === decodedTitulo);

    useEffect(() => {
        if (book) {
            setBookFound(true);  
        } else {
            setBookFound(false); 
        }
    }, [book]); 

    const handleBackClick = () => {
        if (bookFound) {
            router.back();  
        } else {
            router.push("/");  
        }
    };

    if (bookFound === false) {
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

    return (
        <div className="bg-white shadow-2xl rounded-3xl py-8 pl-8 pr-24 min-w-full grid grid-cols-1 md:grid-cols-2 items-center transition-all duration-500">
            <div className="flex justify-center">
                <img
                    src={book.Imagen}
                    alt={book.Titulo}
                    className="w-80 h-80 object-cover rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105"
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/busqueda/default.jpg";
                    }}
                />
            </div>
            <div className="text-gray-800">
                <h2 className="text-3xl font-extrabold text-gray-900 mb-3">{book.Titulo}</h2>

                <p className="text-lg"><strong className="text-cyan-700">Autor(es):</strong> {book["Autor(es)"]}</p>
                <p className="text-lg"><strong className="text-cyan-700">Serie:</strong> {book.Serie || "No especificada"}</p>
                <p className="text-lg"><strong className="text-cyan-700">ISBN13:</strong> {book.ISBN13 || "No disponible"}</p>
                {book.Descripcion && (
                    <p className="mt-4 text-gray-600 leading-relaxed text-justify border-l-4 border-cyan-500 pl-4 italic">
                        {book.Descripcion}
                    </p>
                )}
                <button
                    onClick={handleBackClick}  
                    className="mt-6 px-6 py-2 bg-cyan-800 text-white font-semibold rounded-full shadow-md hover:bg-cyan-700 transition-all"
                >
                    ⬅ Volver
                </button>
            </div>
        </div>
    );
}