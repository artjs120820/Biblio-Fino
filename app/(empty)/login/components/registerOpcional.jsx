import { useState } from "react";
import usuarioApi from "../../../api/usuario";
import { motion } from "framer-motion";

export default function RegisterOptional({ setShowRegisterOptional, data, setShowRegister }) {
  const [step, setStep] = useState(1);
  const [photo, setPhoto] = useState(null);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false); 

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPhoto(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFinish = () => {
    setLoading(true);
    const updatedData = {
      ...data,
      foto_url: "https://wallpapers.com/images/featured/dota-2-telefono-2nrk2n95nq5cilub.jpg",
      description
    };
    console.log(updatedData)
    usuarioApi.registerUsuario(updatedData)
      .then(response => {
        console.log("Datos guardados:", response.data);
        setLoading(false);

        setShowSuccessMessage(true);

        setTimeout(() => {
          setShowRegisterOptional(false);
          setShowRegister(false);
        }, 3000);
      })
      .catch(error => {
        console.error("Error al guardar los datos:", error);
        setLoading(false);
      });
  };

  return (
    <>
      {showSuccessMessage ? (
        <motion.div
          className="success-message"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          exit={{ opacity: 0, scale: 0.8 }}
        >
          <div className="flex justify-center items-center space-x-4 bg-green-100 p-6 rounded-lg shadow-lg">
            <motion.div
              className="bg-green-500 p-4 rounded-full text-white"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 0 0-1.414 0L8 12.586 4.707 9.293a1 1 0 0 0-1.414 1.414l4 4a1 1 0 0 0 1.414 0l9-9a1 1 0 0 0 0-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </motion.div>
            <motion.p
              className="text-green-500 text-lg font-semibold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              ¡Te has registrado satisfactoriamente!
            </motion.p>
          </div>
        </motion.div>
      ) : (
        step === 1 ? (
          <>
            <p className="text-center mb-4">Sube una foto de perfil (opcional):</p>

            <label className="w-[16rem] h-[16rem] mx-auto flex items-center justify-center border-2 border-dashed rounded-full cursor-pointer hover:bg-gray-100 transition">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              {photo ? (
                <img
                  src={photo}
                  alt="Previsualización"
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <span className="text-gray-500 text-center">Haz clic para subir</span>
              )}
            </label>

            <div className="flex justify-between mt-6">
              <button className="font-semibold" onClick={() => setShowRegisterOptional(false)}>
                Volver
              </button>
              <button className="font-semibold" onClick={() => setStep(2)}>
                Omitir
              </button>
              {photo && (
                <button className="font-semibold bg-blue-500 text-white px-4 py-2 rounded-lg" onClick={() => setStep(2)}>
                  Subir y continuar
                </button>
              )}
            </div>
          </>
        ) : (
          <>
            <p className="text-center mb-4">Agrega una breve descripción (opcional, máximo 200 caracteres):</p>
            <textarea
              className="w-full p-2 border-2 rounded-lg focus:outline-none"
              rows="3"
              maxLength="200"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <div className="flex justify-between mt-6">
              <button className="font-semibold" onClick={() => setStep(1)}>
                Volver
              </button>
              <button className="font-semibold" onClick={handleFinish}>
                Omitir
              </button>
              {description && (
                <button className="font-semibold bg-blue-500 text-white px-4 py-2 rounded-lg" onClick={handleFinish}>
                  Siguiente
                </button>
              )}
            </div>
          </>
        )
      )}
      {loading && <p className="mt-4 text-blue-500">Guardando datos...</p>}
    </>
  );
}
