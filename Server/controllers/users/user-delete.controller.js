const Usuario = require("../../models/user.js");
const colors = require("colors");

async function deleteUsuario(req, res) {
  try {
    const { id } = req.params;
    const data = await Usuario.destroy({
      where: {
        id: id,
      },
    });
    return res.status(200).send({ message:"El usuario ha sido Eliminado." });
  } catch (error) {
    console.log(colors.red({ message:"Error en deleteUsuario." }), error);
    return res.status(500).send({ message:"Error en el servidor." });
  }
}

module.exports = { deleteUsuario };
