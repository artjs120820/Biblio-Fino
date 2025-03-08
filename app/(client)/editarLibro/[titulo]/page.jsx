"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
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

    const [libro, setLibro] = useState({
        titulo: "No se encontró información específica",
        autor: "No se encontró información específica",
        genero: "No se encontró información específica",
        isbn: "No se encontró información específica",
        anio: "",
        idioma: "No se encontró información específica",
        editorial: "No se encontró información específica",
        serie: "No se encontró información específica",
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
            <button onClick={() => router.back()} className="bg-slate-500 text-white px-4 py-2 rounded-full hover:bg-slate-600 transition">
                Volver
            </button>
            <h1 className="text-2xl font-bold my-4 text-gray-800">Editar Libro</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-4">
                        {[{ label: "Título", key: "titulo" },
                        { label: "Autor", key: "autor" },
                        { label: "Género", key: "genero" },
                        { label: "ISBN", key: "isbn" },
                        { label: "Año de Publicación", key: "anio" },
                        { label: "Idioma", key: "idioma" },
                        { label: "Editorial", key: "editorial" },
                        { label: "Número de Páginas", key: "paginas" }].map((field, index) => (
                            <div key={index}>
                                <label className="block font-medium text-gray-700">{field.label}</label>
                                <input
                                    type={field.key === "anio" || field.key === "paginas" ? "number" : "text"}
                                    value={libro[field.key] === "No se encontró información específica" ? "" : libro[field.key]}
                                    onChange={(e) => handleInputChange(field.key, e.target.value)}
                                    placeholder={libro[field.key] === "No se encontró información específica" ? "Ingrese información" : ""}
                                    className="w-full p-2 border rounded focus:ring focus:ring-blue-200"
                                />
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-col items-center space-y-4">
                        <label className="text-lg font-extrabold text-gray-800">Imagen del Libro</label>
                        <label className="w-[23rem] h-[28rem] border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50 cursor-pointer hover:border-blue-400 transition shadow-lg relative overflow-hidden">
                            {libro.imagen ? (
                                <img
                                    src={libro.imagen}
                                    alt="Vista previa"
                                    className="w-full h-full object-cover rounded-md hover:scale-105 transition-transform"
                                    onError={(e) => {
                                        e.target.src = "";
                                        e.target.alt = "No se pudo encontrar la URL de la imagen. Por favor, suba una nueva.";
                                    }}
                                />
                            ) : (
                                <div className="text-gray-500 text-center flex flex-col items-center">
                                    <span className="text-sm">No se pudo encontrar la URL de la imagen. Por favor, suba una nueva.</span>
                                </div>
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
