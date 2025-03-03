export default function BookCard({ book, filters }) {
    return (
        <div
            className="relative w-full h-[350px] rounded-lg overflow-hidden shadow-md"
            style={{
                backgroundImage: `url(${book.Imagen})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center p-4 rounded-lg">
                <div className="flex-shrink-0">
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
                <div className="ml-4 text-white" style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.7)" }}>
                    <h2 className="font-bold text-xl">{book.Titulo}</h2>
                    {filters.authors && <p className="text-sm">Autor: {book["Autor(es)"]}</p>}
                    {filters.series && <p className="text-sm">Serie: {book.Serie}</p>}
                    {filters.isbn && <p className="text-sm">ISBN: {book.ISBN13}</p>}
                </div>
            </div>
        </div>
    );
}
