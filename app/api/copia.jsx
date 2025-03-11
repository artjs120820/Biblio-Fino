import base from "./base";

const busqueda = async (titulo, page) =>
  await base.get(`/buscar_libros/?titulo=${encodeURIComponent(titulo)}&page=${page}`);

export default { busqueda };
