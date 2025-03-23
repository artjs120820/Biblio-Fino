import { useState } from "react";
import { motion } from "framer-motion";
import RegisterNameContra from "../components/registerNameContra";
import CodigoInput from "../components/codigoInput";
import codigoRegisterApi from "../../../api/codigoRegister";

export default function RegisterEmail({ setShowRegister }) {
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [showNamePassword, setShowNamePassword] = useState(false);
  const [email, setEmail] = useState("");
  const [codigo, setCodigo] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const fadeIn = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  };

  const handleGenerateCode = async () => {
    if (!email) {
      setError("El correo es obligatorio");
      return;
    }

    setLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      const response = await codigoRegisterApi.generarCodigo(email);
      if (response.data.success) {
        setShowCodeInput(true);
        setSuccessMessage("Código enviado con éxito. Revisa tu correo.");
      } else {
        setError(response.data.message || "Error al generar el código");
      }
    } catch (err) {
      setError("Error al conectar con el servidor");
    }

    setLoading(false);
  };

  const handleValidateCode = async () => {
    console.log(codigo)
    if (!codigo) {
      setError("Debes ingresar el código de 6 dígitos");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await codigoRegisterApi.validarCodigo(email, codigo);
      setError(""); 

      if (response.data.success) {
        setShowCodeInput(false);
        setShowNamePassword(true);
      } else {
        setError(response.data.message || "Código incorrecto o vencido");
      }
    } catch (err) {
      setError(err.message); 
    }

    setLoading(false);
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={fadeIn}
    >
      <h2 className="text-3xl font-bold mb-6 text-center">Registrar Usuario</h2>



      {!showCodeInput && !showNamePassword ? (
        <>
          <p>Por favor, ingrese su correo:</p>
          <div className="text-left mb-4">
            <label className="block text-sm font-semibold text-gray-700">
              Correo:
            </label>
            <input
              type="email"
              className="w-full p-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="flex justify-between mt-4">
            <button
              className="text-gray-600 hover:underline"
              onClick={() => setShowRegister(false)}
            >
              Volver
            </button>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
              onClick={handleGenerateCode}
              disabled={loading}
            >
              {loading ? "Enviando..." : "Verificar"}
            </button>
          </div>
        </>
      ) : showCodeInput ? (
        <>
          {successMessage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-green-500 text-white p-3 rounded-md mb-4 text-center"
            >
              {successMessage}
            </motion.div>
          )}
          <p className="mb-3">Ingrese el código de verificación enviado a su correo:</p>
          <CodigoInput setCodigo={setCodigo} />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div className="flex justify-between mt-4">
            <button
              className="text-gray-600 hover:underline"
              onClick={() => setShowCodeInput(false)}
            >
              Volver
            </button>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300"
              onClick={handleValidateCode}
              disabled={loading}
            >
              {loading ? "Validando..." : "Confirmar Código"}
            </button>
          </div>
        </>
      ) : (
        <RegisterNameContra setShowRegister={setShowRegister} email={email} setShowNamePassword={setShowNamePassword}/>
      )}
    </motion.div>
  );
}
