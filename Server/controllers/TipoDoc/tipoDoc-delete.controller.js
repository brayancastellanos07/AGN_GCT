const Tipo_Doc = require("../../models/tipodocumento.js");

async function deleteDoc(req, res) {
  const { id } = req.params;
  try {
    const data = await Tipo_Doc.destroy({
      where: {
        id_documento: id
      },
    });
    if (!data.length) {
      return res
        .status(404)
        .send(`No se encontro el documento con el id: ${id}`);
    }
    return res.status(200).json({ data });
  } catch (error) {
    return res.status(500).send("Error en el servidor");
  }
}
module.exports = { deleteDoc };
