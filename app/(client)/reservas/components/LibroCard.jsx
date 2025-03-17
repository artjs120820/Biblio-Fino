export default function LibroCard({ libro }) {
    const formatearFecha = (fecha) => {
        const fechaObj = new Date(fecha);
        const dia = fechaObj.getDate().toString().padStart(2, "0");
        const mes = (fechaObj.getMonth() + 1).toString().padStart(2, "0");
        const año = fechaObj.getFullYear();
        const horas = fechaObj.getHours().toString().padStart(2, "0");
        const minutos = fechaObj.getMinutes().toString().padStart(2, "0");
    
        return `${dia}/${mes}/${año}, ${horas}:${minutos}`;
    };
    return (
        <div className="flex items-center bg-white rounded-lg shadow-md overflow-hidden">
            <div className="flex-shrink-0 transform transition-transform duration-300 ease-in-out group-hover:scale-105">
                <img
                    src={libro.copia.imagen}
                    alt={libro.libro.titulo}
                    className="w-[200px] max-[1604px]:w-[150px] max-[1425px]:w-[100px] 
                               h-[200px] object-cover rounded-md"
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/busqueda/default.jpg";
                    }}
                />
            </div>
            <div className="w-2/3 p-4 flex flex-col justify-center gap-2">
                <h3 className="text-lg font-semibold">{libro.libro.titulo}</h3>
                <p className="text-gray-600">Autor: {libro.libro.autor}</p>
                <p className="text-gray-500 text-sm">📅 Reserva: {formatearFecha(libro.fecha_reserva)}</p>
                <p className="text-gray-500 text-sm">⏳ Vence: {formatearFecha(libro.fecha_vencimiento)}</p>
            </div>
        </div>
    );
}