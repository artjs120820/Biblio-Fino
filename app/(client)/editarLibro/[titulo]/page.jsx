"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";

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
export default function EditarLibro() {
    const { titulo } = useParams();
    const decodedTitulo = decodeURIComponent(titulo);
    const router = useRouter();
    const libroEncontrado = data.find(libro => libro.Titulo === decodedTitulo);
    const [imagenError, setImagenError] = useState(false);

    const handleImageError = () => {
        setImagenError(true); 
    };
    const [libro, setLibro] = useState({
        titulo: "",
        autor: "",
        genero: "",
        isbn: "",
        anio: "",
        idioma: "",
        editorial: "",
        serie: "",
        paginas: "",
        imagen: null
    });

    useEffect(() => {
        if (libroEncontrado) {
            setLibro({
                titulo: libroEncontrado.Titulo || "",
                autor: libroEncontrado["Autor(es)"] || "",
                genero: libroEncontrado.Genero || "",
                isbn: libroEncontrado.ISBN13 || "",
                anio: libroEncontrado.Anio || "",
                idioma: libroEncontrado.Idioma || "",
                editorial: libroEncontrado.Editorial || "",
                serie: libroEncontrado.Serie || "",
                paginas: libroEncontrado.Paginas || "",
                imagen: libroEncontrado.Imagen || null
            });
        }
    }, [libroEncontrado]);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(libro);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setLibro(prevState => ({
                ...prevState,
                imagen: URL.createObjectURL(file)
            }));
        }
    };

    const handleInputChange = (key, value) => {
        setLibro(prev => ({ ...prev, [key]: value }));
    };

    return (
        <div className="p-6 bg-white shadow-lg rounded-lg">
            <div className="flex flex-row items-center justify-between mb-3">
                <h1 className="text-2xl font-bold text-gray-800">Editar Libro</h1>
                <button onClick={() => router.back()} className="bg-slate-500 text-white px-4 py-2 rounded-full hover:bg-slate-600 transition">
                    Volver
                </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex gap-6 ">
                    <div className="flex-[50%] flex flex-col gap-4">
                        {[
                            { label: "Título", key: "titulo" },
                            { label: "Autor", key: "autor" },
                            { label: "Género", key: "genero" },
                            { label: "ISBN", key: "isbn" },
                        ].map((field, index) => (
                            <div key={index} className="flex flex-col">
                                <label className="font-medium text-gray-700">{field.label}</label>
                                <input
                                    type={field.key === "paginas" ? "number" : "text"}
                                    value={libro[field.key] || ""}
                                    onChange={(e) => handleInputChange(field.key, e.target.value)}
                                    placeholder="No hay información al respecto"
                                    className="w-full p-2 border rounded focus:ring focus:ring-blue-200 placeholder-gray-400 text-gray-700"
                                />
                            </div>
                        ))}

                        <div className="flex gap-4">
                            <div className="flex-1">
                                <label className="font-medium text-gray-700">Año de Publicación</label>
                                <input
                                    type="number"
                                    value={libro.anio || ""}
                                    onChange={(e) => handleInputChange("anio", e.target.value)}
                                    placeholder="No hay información"
                                    className="w-full p-2 border rounded focus:ring focus:ring-blue-200 placeholder-gray-400 text-gray-700"
                                />
                            </div>
                            <div className="flex-1">
                                <label className="font-medium text-gray-700">Idioma</label>
                                <input
                                    type="text"
                                    value={libro.idioma || ""}
                                    onChange={(e) => handleInputChange("idioma", e.target.value)}
                                    placeholder="No hay información"
                                    className="w-full p-2 border rounded focus:ring focus:ring-blue-200 placeholder-gray-400 text-gray-700"
                                />
                            </div>
                        </div>
                        {[
                            { label: "Editorial", key: "editorial" },
                            { label: "Número de Páginas", key: "paginas" }
                        ].map((field, index) => (
                            <div key={index} className="flex flex-col">
                                <label className="font-medium text-gray-700">{field.label}</label>
                                <input
                                    type={field.key === "paginas" ? "number" : "text"}
                                    value={libro[field.key] || ""}
                                    onChange={(e) => handleInputChange(field.key, e.target.value)}
                                    placeholder="No hay información al respecto"
                                    className="w-full p-2 border rounded focus:ring focus:ring-blue-200 placeholder-gray-400 text-gray-700"
                                />
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-col items-center gap-4 flex-[50%]">
                        <label className="text-lg font-extrabold text-gray-800">Imagen del Libro</label>
                        <label className="w-[23rem] h-[28rem] border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50 cursor-pointer hover:border-blue-400 transition shadow-lg relative overflow-hidden">
                            {libro.imagen && !imagenError ? (
                                <img
                                    src={libro.imagen}
                                    alt="Vista previa"
                                    className="w-full h-full object-cover rounded-md hover:scale-105 transition-transform"
                                    onError={handleImageError} 
                                />
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }} 
                                    animate={{ opacity: 1, y: 0 }} 
                                    transition={{ type: "spring", stiffness: 100, damping: 8 }} 
                                    className="text-gray-500 text-center flex flex-col items-center"
                                >
                                    <span className="text-sm">No se pudo encontrar la URL de la imagen. Por favor, suba una nueva.</span>
                                </motion.div>
                            )}
                            <input id="imagen" type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                        </label>
                    </div>
                </div>
                <hr className="border-gray-300 my-6" />
                <div className="flex justify-start gap-4">
                    <button type="button" className="bg-gray-400 text-white px-6 py-2 rounded hover:bg-gray-500 transition">
                        Cancelar
                    </button>
                    <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition">
                        Guardar Cambios
                    </button>
                </div>
            </form>
        </div>
    );
}   