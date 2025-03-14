import base from "./base";

const obtenerReservas = async (id) =>
  await base.get(`/obtener_reservas_usuario/${id}/`);

export default { obtenerReservas };
