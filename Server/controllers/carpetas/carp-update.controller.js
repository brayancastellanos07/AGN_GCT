const Carpeta = require("../../models/carpetas.js");
const colors = require("colors");

async function updateCarp(req, res) {
  const { id } = req.params;
  const { Nombre, Descripcion } = req.body;

  const nombre = Nombre.toLowerCase();
  const descripcion = Descripcion.toLowerCase();

  try {
    const dataFind = await Carpeta.findAll({
      where: {
        nombre: nombre,
      },
    });
    if (dataFind.length) {
      return res
        .status(404)
        .send({ message: `¡La carpeta ${nombre} ya existe! ` });
    }

    const dataUpdate = await Carpeta.update(
      {
        nombre: nombre,
        descripcion: descripcion,
      },
      {
        where: {
          id_carpeta: id,
        },
      }
    );
    return res
      .status(201)
      .json({ message: "Carpeta Actualizada correctamente. " });
  } catch (error) {
    console.log(colors.red("Error en updateCarp"), error);
    return res.status(500).send({ message: "Error en el servidor" });
  }
}

module.exports = { updateCarp };
