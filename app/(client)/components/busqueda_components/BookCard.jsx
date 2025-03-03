export default function BookCard({ book, filters }) {
    return (
        <div
            className="relative w-full h-[350px] rounded-lg cursor-pointer overflow-hidden shadow-md group"
            style={{
                backgroundImage: `url(${book.Imagen})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center py-4 pl-6 pr-4 rounded-lg">
                {/* Contenedor de la imagen con animación en hover */}
                <div className="flex-shrink-0 transform transition-transform duration-300 ease-in-out group-hover:scale-110">
                    <img
                        src={book.Imagen}
                        alt={book.Titulo}
                        className="w-[140px] h-[190px] object-cover rounded-md"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/busqueda/default.jpg";
                        }}
                    />
                </div>
                {/* Contenedor del texto con animación en hover */}
                <div
                    className="ml-8 text-white transform transition-transform duration-300 ease-in-out group-hover:scale-110"
                    style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.7)" }}
                >
                    <h2 className="font-bold text-xl">{book.Titulo}</h2>
                    {filters.authors && <p className="text-sm">Autor: {book["Autor(es)"]}</p>}
                    {filters.series && <p className="text-sm">Serie: {book.Serie}</p>}
                    {filters.isbn && <p className="text-sm">ISBN: {book.ISBN13}</p>}
                </div>
            </div>
        </div>
    );
}
