import base from "./base";

const obtenerReservas = async (id) =>
  await base.get(`/obtener_reservas_usuario/${id}/`);

const obtenerTodasReservas = async () =>
  await base.post("/obtener_todas_reservas/");

export default { obtenerReservas , obtenerTodasReservas};
