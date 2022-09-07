const Carpeta = require("../../models/carpetas.js");
const colors = require("colors");

async function postCarp(req, res) {
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
      return res.status(404).send(`La carpeta ${nombre} ya existe! `);
    }
    const data = await Carpeta.create(
      {
        nombre,
        descripcion,
      },
      {
        fields: ["nombre", "descripcion"],
      }
    );
    return res.status(200).json({ data });
  } catch (error) {
    console.log(colors.red("Error en postCarp"), error);
    return res.status(500).send("Error en el servidor");
  }
}

module.exports = { postCarp };
