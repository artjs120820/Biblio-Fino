import base from "./base";

const obtenerDatosCiudadano = async (id) =>
  await base.get(`/obtener_usuario_y_ciudadano/${id}`);

const registerUsuario = async (data) =>
  await base.post("/crear_usuario/", data);

export default { obtenerDatosCiudadano, registerUsuario };
