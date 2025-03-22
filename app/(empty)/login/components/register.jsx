import { useState } from "react";
import RegisterNameContra from "../components/registerNameContra";

export default function RegisterEmail({ setShowRegister }) {
  const [showNamePassword, setShowNamePassword] = useState(false);

  return (
    <>
      <h2 className="text-3xl font-bold mb-6">Registrar Usuario</h2>
      {!showNamePassword ? (
        <>
          <p>Por favor digite su correo: </p>
          <div className="text-left mb-4">
            <label className="block text-sm font-semibold text-gray-700">
              Correo:
            </label>
            <input
              type="email"
              className="w-full p-2 border-2 rounded-lg focus:outline-none"
            />
          </div>

          <div className="flex justify-between">
            <button
              className="font-semibold"
              onClick={() => setShowRegister(false)}
            >
              Volver
            </button>
            <button
              className="font-semibold"
              onClick={() => setShowNamePassword(true)}
            >
              Verificar
            </button>
          </div>
        </>
      ) : (
        <RegisterNameContra setShowNamePassword={setShowNamePassword} />
      )}
    </>
  );
}
