export default function LibroCard({ libro }) {
    return (
        <div className="flex items-center bg-white rounded-lg shadow-md overflow-hidden">
            <div className="flex-shrink-0 transform transition-transform duration-300 ease-in-out group-hover:scale-105">
                <img
                    src={libro.imagen}
                    alt={libro.titulo}
                    className="w-[200px] max-[1604px]:w-[150px] max-[1425px]:w-[100px] 
                               h-[200px] object-cover rounded-md"
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/busqueda/default.jpg";
                    }}
                />
            </div>
            <div className="w-2/3 p-4 flex flex-col justify-center gap-2">
                <h3 className="text-lg font-semibold">{libro.titulo}</h3>
                <p className="text-gray-600">Autor: {libro.autor}</p>
                <p className="text-gray-500 text-sm">📅 Reserva: {libro.fechapedido}</p>
                <p className="text-gray-500 text-sm">⏳ Vence: {libro.fechavencimiento}</p>
            </div>
        </div>
    );
}