import base from "./base";

const login = async (correo, contrasenia) =>
  await base.post("/login/", { correo, contrasenia });

const verificarDni = async (dni) =>
  await base.post("/verificar_dni/", { dni });

export default { login , verificarDni};
