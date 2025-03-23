import RegisterOptional from "../components/registerOpcional";
import { useState } from "react";
import ciudadanoApi from "../../../api/ciudadano";
import { FaEye, FaEyeSlash } from "react-icons/fa"; 

export default function RegisterNameContrasenia({ email, setShowNamePassword , setShowRegister}) {
    const [showRegisterOptional, setShowRegisterOptional] = useState(false);
    const [dni, setDni] = useState("");
    const [password, setPassword] = useState("");
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleDniChange = (event) => {
        setDni(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleNombreChange = (event) => {
        setNombre(event.target.value);
    };
    const handleApellidoChange = (event) => {
        setApellido(event.target.value);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const isPasswordStrong = (password) => {
        const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&\-_])[A-Za-z\d@$!%*?&\-_]{8,}$/;
        return regex.test(password);
    };

    const handleRegister = async () => {
        setErrorMessage("");

        if (!isPasswordStrong(password)) {
            setErrorMessage("La contraseña debe tener al menos 8 caracteres, una mayúscula, un número y un carácter especial.");
            return;
        }

        try {
            const response = await ciudadanoApi.verificarDni(dni);
            if (!response.data.success) {
                setErrorMessage(response.data.message || "El DNI ya está registrado.");
            } else {
                setShowRegisterOptional(true);
            }
        } catch (response) {
            setErrorMessage(response?.message || "Error al verificar el DNI. Inténtalo de nuevo.");
        }
    };

    return (
        <>
            {!showRegisterOptional ? (
                <>
                    <h2 className="text-green-500">Correo validado con éxito!</h2>
                    <div className="text-left mb-4">
                        <label className="block text-sm font-semibold text-gray-700">Nombres:</label>
                        <input
                            type="text"
                            value={nombre}
                            onChange={handleNombreChange}
                            className="w-full p-2 border-2 rounded-lg focus:outline-none"
                        />
                    </div>
                    <div className="text-left mb-4">
                        <label className="block text-sm font-semibold text-gray-700">Apellidos:</label>
                        <input
                            type="text"
                            value={apellido}
                            onChange={handleApellidoChange}
                            className="w-full p-2 border-2 rounded-lg focus:outline-none"
                        />
                    </div>

                    {/* Campo de contraseña con icono de ojo */}
                    <div className="text-left mb-4 relative">
                        <label className="block text-sm font-semibold text-gray-700">Contraseña:</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={handlePasswordChange}
                                className="w-full p-2 border-2 rounded-lg focus:outline-none pr-10"
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-3 text-gray-600"
                                onClick={togglePasswordVisibility}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>

                    <div className="text-left mb-4">
                        <label className="block text-sm font-semibold text-gray-700">DNI:</label>
                        <input
                            type="number"
                            value={dni}
                            onChange={handleDniChange}
                            className="w-full p-2 border-2 rounded-lg focus:outline-none"
                        />
                    </div>

                    <div className="flex justify-between">
                        <button className="font-semibold" onClick={() => setShowNamePassword(false)}>
                            Volver
                        </button>
                        <button className="font-semibold" onClick={handleRegister}>
                            Registrar
                        </button>
                    </div>

                    {errorMessage && (
                        <p className="mt-3 text-red-500 text-sm font-semibold">{errorMessage}</p>
                    )}
                </>
            ) : (
                <RegisterOptional
                    setShowRegisterOptional={setShowRegisterOptional}
                    data={{ email, nombre, apellido, password, dni }}
                    setShowRegister={setShowRegister}
                />
            )}
        </>
    );
}
