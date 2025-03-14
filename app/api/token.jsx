import base from "./base";

const tokenSession = async (token) =>
  await base.post("/buscarCiudadanoXToken/", { token });


const cerrarSesion = async (token) =>
  await base.post("/logout/", { token });

export default { tokenSession, cerrarSesion };
