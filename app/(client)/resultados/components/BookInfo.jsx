export default function BookInfo({ book, onBack }) {
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
                    onClick={onBack}
                    className="mt-6 px-6 py-2 bg-cyan-800 text-white font-semibold rounded-full shadow-md hover:bg-cyan-700 transition-all"
                >
                    ⬅ Volver
                </button>
            </div>
        </div>

    );
}
