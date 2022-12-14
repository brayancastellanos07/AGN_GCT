const Carpeta = require("../../models/carpetas.js");
const colors = require("colors");

async function deleteCarp(req, res) {
  try {
    const { id } = req.params;
    const data = await Carpeta.destroy({
      where: {
        id: id,
      },
    });
    return res.status(200).send({ message:"La Carpeta ha sido Eliminada." });
  } catch (error) {
    console.log(colors.red("Error en deleteDoc"), error);
    return res.status(500).send( {message: "Error en el servidor, la carpeta tiene conceptos asignados. "});
  }
}

module.exports = { deleteCarp };
 