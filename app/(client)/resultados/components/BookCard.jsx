import { useToken } from "../../../context/tokenContext";
import Link from "next/link";
export default function BookCard({ book, filters }) {
    const { tokenData } = useToken();

    return (
        <div
            className="relative w-full h-[40vh] sm:h-[35vh] md:h-[40vh] rounded-lg cursor-pointer overflow-hidden shadow-md group"
            style={{
                backgroundImage: `url(${book.imagen})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
            onClick={() => console.log(`Clic en la tarjeta de ${book.Titulo}`)}
        >
            <div className="absolute inset-0 bg-black bg-opacity-80 flex items-center py-4 px-6 gap-5 rounded-lg">
                <div className="flex-shrink-0 transform transition-transform duration-300 ease-in-out group-hover:scale-110">
                    <img
                        src={book.imagen}
                        alt={book.libro.titulo}
                        className="w-[200px] max-[1604px]:w-[150px] max-[1425px]:w-[100px] h-[280px] max-[1425px]:h-[220px] object-cover rounded-md"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/busqueda/default.jpg";
                        }}
                    />
                </div>
                <div
                    className="ml-6 sm:ml-4 text-white transform transition-transform duration-300 ease-in-out group-hover:scale-105 rounded-lg"
                >
                    <h2 className="font-bold text-xl sm:text-lg md:text-xl text-cyan-200">{book.libro.titulo}</h2>

                    {filters?.authors && book.libro.autor && (
                        <p className="text-sm max-[1406px]:text-xs font-extrabold text-white-200">Autor: <span className="text-white-200 font-normal">{book.libro.autor}</span></p>
                    )}
                    {filters?.genero && (
                        <p className="text-sm max-[1406px]:text-xs font-extrabold text-white-200">Género: <span className="text-white-200 font-normal">{book.libro.genero}</span></p>
                    )}
                    {filters?.isbn && (
                        <p className="text-sm max-[1406px]:text-xs font-extrabold text-white-200">ISBN: <span className="text-white-200 font-normal">{book.isbn}</span></p>
                    )}

                    {tokenData?.tipo_usuario && ["administrador", "usuario"].includes(tokenData.tipo_usuario) && (
                        <div className="mt-5">
                            <Link
                                href={`/${tokenData.tipo_usuario === "administrador" ? "editarLibro" : "reservaLibro"}/${encodeURIComponent(book.id)}`}
                                className="bg-cyan-700 text-white px-4 py-2 rounded-full hover:bg-cyan-500 transition cursor-pointer shadow-md hover:shadow-lg"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {tokenData.tipo_usuario === "administrador" ? "Editar Libro" : "Reservar Libro"}
                            </Link>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}
