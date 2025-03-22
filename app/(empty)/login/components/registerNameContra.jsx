import RegisterOptional from "../components/registerOpcional";
import { useState } from "react";

export default function RegisterNameContrasenia({ setShowNamePassword }) {
    const [showRegisterOptional, setShowRegisterOptional] = useState(false);

    return (
        <>
            {!showRegisterOptional ? (
                <>
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
                            Contraseña:
                        </label>
                        <input
                            type="password"
                            className="w-full p-2 border-2 rounded-lg focus:outline-none"
                        />
                    </div>
                    <div className="text-left mb-4">
                        <label className="block text-sm font-semibold text-gray-700">
                            DNI:
                        </label>
                        <input
                            type="number"
                            className="w-full p-2 border-2 rounded-lg focus:outline-none"
                        />
                    </div>
                    <div className="flex justify-between">
                        <button
                            className="font-semibold"
                            onClick={() => setShowNamePassword(false)}
                        >
                            Volver
                        </button>
                        <button
                            className="font-semibold"
                            onClick={() => setShowRegisterOptional(true)}
                        >
                            Registrar
                        </button>
                    </div>
                </>
            ) : (
                <RegisterOptional setShowRegisterOptional={setShowRegisterOptional} />
            )}
        </>
    );
}