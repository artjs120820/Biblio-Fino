import base from "./base";

const obtenerDatosCiudadano = async (id) =>
  await base.get(`/obtener_usuario_y_ciudadano/${id}`);

export default { obtenerDatosCiudadano };
