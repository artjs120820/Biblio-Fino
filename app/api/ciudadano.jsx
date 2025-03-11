import base from "./base";

const login = async (correo, contrasenia) =>
  await base.post("/login/", { correo, contrasenia });

export default { login };
