const Tipo_Doc = require("../../models/tipodocumento.js");


async function getDoc(req, res) {

  try {
    const data = await Tipo_Doc.findAll({
      atributes: ["id_documento", "tipo", "descripcion"],
    });
    if (!data.length) {
      return res.status(404).send("No se encontraron Registros");
    }
    return res.status(200).json({ data });
  } catch (error) {
    return res.status(500).send("Error en el servidor");
  }
}

async function getDocById(req, res) {
    const {id } = req.params;
  try {
    const data = await Tipo_Doc.findAll({
      where: {
        id_documento: id,
      },
    });
    if (!data.length) {
      return res.status(404).send(`No se encontro el documento con el id: ${id} `);
    }
    return res.status(201).json({ data });
  } catch (error) {
    return res.status(500).send("Error en el servidor");
  }
}

module.exports = { getDoc, getDocById };
