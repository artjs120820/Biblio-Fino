import { useState } from "react";

export default function RegisterOptional({ setShowRegisterOptional }) {
  const [step, setStep] = useState(1);
  const [photo, setPhoto] = useState(null);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

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
    setTimeout(() => {
      console.log("Datos guardados:", { photo, description });
      setLoading(false);
      setShowRegisterOptional(false);
    }, 2000);
  };

  return (
    <>
      {step === 1 ? (
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
          <p className="text-center mb-4">Agrega una breve descripción (opcional):</p>
          <textarea
            className="w-full p-2 border-2 rounded-lg focus:outline-none"
            rows="3"
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
      )}

      {loading && <p className="mt-4 text-blue-500">Guardando datos...</p>}
    </>
  );
}
