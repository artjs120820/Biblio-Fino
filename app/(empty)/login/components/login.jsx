import { useState } from "react";
import { useUser } from "../../../context/UserContext";

const usuario = {
  correo: "arturosilvera@gmail.com",
  contra: "123456",
};

export default function LoginForm({ setShowRegister, handleClose }) {
  const { setUser } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleLogin = () => {
    if (email === usuario.correo && password === usuario.contra) {
      const dataUsuarioRetornada = {
        token: "fakeToken123456",
        usuario: {
          correo: usuario.correo,
          contra: usuario.contra,
          dni: "12345678",
          ciudad: "Lima",
          telefono: "987654321",
          librosRegistrados: [
            { titulo: "Cien años de soledad", autor: "Gabriel García Márquez" },
            { titulo: "1984", autor: "George Orwell" },
            { titulo: "El principito", autor: "Antoine de Saint-Exupéry" },
          ],
        },
      };
      setSuccessMessage("Inicio de sesión exitoso. Cerrando...");
      setTimeout(() => {
        handleClose();
        localStorage.setItem("user", JSON.stringify(dataUsuarioRetornada.usuario));

        const encodedUserInfo = btoa(JSON.stringify(dataUsuarioRetornada));
        document.cookie = `auth_token=${encodedUserInfo}; path=/; max-age=86400; Secure`;
        setUser(dataUsuarioRetornada.usuario);
      }, 2000);
    } else {
      setError("Correo o contraseña incorrectos");
    }
  };

  return (
    <>
      <h2 className="text-3xl font-bold mb-6">Sistema de reserva de libros</h2>

      {successMessage ? (
        <p className="text-green-500 text-lg font-semibold">{successMessage}</p>
      ) : (
        <>
          <div className="text-left mb-4">
            <label className="block text-sm font-semibold text-gray-700">
              Usuario o correo:
            </label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border-2 rounded-lg focus:outline-none"
            />
          </div>

          <div className="text-left mb-2">
            <label className="block text-sm font-semibold text-gray-700">
              Contraseña:
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border-2 rounded-lg focus:outline-none"
            />
          </div>

          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

          <div className="text-right mb-4">
            <a href="#" className="text-blue-600 text-sm">
              Olvidé mi contraseña
            </a>
          </div>

          <div className="flex justify-between">
            <button
              className="font-semibold bg-blue-500 text-white px-4 py-2 rounded"
              onClick={handleLogin}
            >
              Ingresar
            </button>
            <button className="font-semibold" onClick={() => setShowRegister(true)}>
              Registrar usuario
            </button>
          </div>
        </>
      )}
    </>
  );
}
