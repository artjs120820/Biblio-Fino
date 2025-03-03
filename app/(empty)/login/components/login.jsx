export default function LoginForm({ setShowRegister }) {
    return (
      <>
        <h2 className="text-3xl font-bold mb-6">Sistema de reserva de libros</h2>
  
        <div className="text-left mb-4">
          <label className="block text-sm font-semibold text-gray-700">
            Usuario o correo:
          </label>
          <input
            type="text"
            className="w-full p-2 border-2 rounded-lg focus:outline-none"
          />
        </div>
  
        <div className="text-left mb-2">
          <label className="block text-sm font-semibold text-gray-700">
            Contraseña:
          </label>
          <input
            type="password"
            className="w-full p-2 border-2 rounded-lg focus:outline-none"
          />
        </div>
  
        <div className="text-right mb-4">
          <a href="#" className="text-blue-600 text-sm">Olvidé mi contraseña</a>
        </div>
  
        <div className="flex justify-between">
          <button className="font-semibold">Ingresar</button>
          <button
            className="font-semibold"
            onClick={() => setShowRegister(true)}
          >
            Registrar usuario
          </button>
        </div>
      </>
    );
  }
  