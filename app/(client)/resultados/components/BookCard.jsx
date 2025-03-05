export default function BookCard({ book, filters }) {
    return (
        <div
            className="relative w-full h-[40vh] sm:h-[35vh] md:h-[40vh] rounded-lg cursor-pointer overflow-hidden shadow-md group"
            style={{
                backgroundImage: `url(${book.Imagen})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center py-4 px-6 gap-5 rounded-lg">
                <div className="flex-shrink-0 transform transition-transform duration-300 ease-in-out group-hover:scale-110">
                    <img
                        src={book.Imagen}
                        alt={book.Titulo}
                        className="w-[200px] max-[1604px]:w-[150px] max-[1425px]:w-[100px] h-[280px] max-[1425px]:h-[220px] object-cover rounded-md"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/busqueda/default.jpg";
                        }}
                    />
                </div>
                <div
                    className="ml-6 sm:ml-4 text-white transform transition-transform duration-300 ease-in-out group-hover:scale-110"
                    style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.7)" }}
                >
                    <h2 className="font-bold text-xl sm:text-lg md:text-xl">{book.Titulo}</h2>
                    {filters?.authors && book["Autor(es)"] && (
                        <p className="text-sm max-[1406px]:text-xs ">Autor: {book["Autor(es)"]}</p>
                    )}
                    {filters?.series && (
                        <p className="text-sm max-[1406px]:text-xs ">Serie: {book.Serie}</p>
                    )}
                    {filters?.isbn && (
                        <p className="text-sm max-[1406px]:text-xs ">ISBN: {book.ISBN13}</p>
                    )}
                </div>
            </div>
        </div>
    );
}
