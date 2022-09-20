const Usuario = require("../../models/user.js");
const colors = require("colors");

async function getUsuario(req, res) {
  try {
    const data = await Usuario.findAll({
      atributes: [
        "id_usuario",
        "nombre",
        "apellido",
        "tipodocumento",
        "documento",
        "telefono",
        "rol",
        "correo",
        "contrasena",
        "status",
      ],
    });
    if (!data.length) {
      return res
        .status(404)
        .send({ message: "No se encontraron registros de usuarios" });
    }
    return res.status(200).json({ data });
  } catch (error) {
    console.log(colors.red("Error en getUsuario"), error);
    return res.status(500).send({ message: "Error en el servidor" });
  }
}

async function getUsuarioActive(req, res) {
    try {
        const { status } = req.params;
    
        const data = await Usuario.findAll({
            where: {
            status: status,
          },});
    
          console.log(data)
        if (!data.length) {
          return res
            .status(404)
            .send({ message: "No se encontraron registros de usuarios" });
        }
        return res.status(200).json({ data });
      } catch (error) {
        console.log(colors.red("Error en getUsuario"), error);
        return res.status(500).send({ message: "Error en el servidor" });
      }
}

async function getUsuarioById(red, res) {
  const { id } = red.params;
  try {
    const data = await Usuario.findAll({
      where: {
        id_usuario: id,
      },
    });
    if (!data.length) {
      return res
        .status(404)
        .send({ message: `No se encontro el Usuario con el id ${id}` });
    }
    return res.status(200).json({ data });
  } catch (error) {
    console.log(colors.red("Error en getUsuarioById"), error);
    return res.status(500).send({ message: "Error en el servidor" });
  }
}

module.exports = { getUsuario, getUsuarioActive, getUsuarioById };
