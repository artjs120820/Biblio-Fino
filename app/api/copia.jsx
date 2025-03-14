import base from "./base";

const busqueda = async (titulo, page) =>
  await base.get(`/buscar_libros/?titulo=${encodeURIComponent(titulo)}&page=${page}`);

const devolverLibro = async (id) =>
  await base.get(`/buscarCopiaPorId/${id}`);

export default { busqueda , devolverLibro};
