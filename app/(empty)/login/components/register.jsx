export default function RegisterForm({ setShowRegister }) {
    return (
      <>
        <h2 className="text-3xl font-bold mb-6">Registrar Usuario</h2>
  
        <div className="text-left mb-4">
          <label className="block text-sm font-semibold text-gray-700">
            Nombre:
          </label>
          <input
            type="text"
            className="w-full p-2 border-2 rounded-lg focus:outline-none"
          />
        </div>
  
        <div className="text-left mb-4">
          <label className="block text-sm font-semibold text-gray-700">
            Correo:
          </label>
          <input
            type="email"
            className="w-full p-2 border-2 rounded-lg focus:outline-none"
          />
        </div>
  
        <div className="text-left mb-4">
          <label className="block text-sm font-semibold text-gray-700">
            Contraseña:
          </label>
          <input
            type="password"
            className="w-full p-2 border-2 rounded-lg focus:outline-none"
          />
        </div>
  
        <div className="flex justify-between">
          <button className="font-semibold">Registrarse</button>
          <button
            className="font-semibold"
            onClick={() => setShowRegister(false)}
          >
            Volver
          </button>
        </div>
      </>
    );
  }
  