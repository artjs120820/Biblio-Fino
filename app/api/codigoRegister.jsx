import base from "./base";

const generarCodigo = async (email) =>
  await base.post("/correo_autenticacion/", { email });

const validarCodigo = async (email, codigo) =>
  await base.post("/validar_codigo/", { email, codigo });

export default { generarCodigo , validarCodigo};
