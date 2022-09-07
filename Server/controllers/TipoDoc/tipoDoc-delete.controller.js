const Tipo_Doc = require("../../models/tipodocumento.js");
const colors = require("colors");

async function deleteDoc(req, res) {
  try {
    const { id } = req.params;
    const data = await Tipo_Doc.destroy({
      where: {
        id_documento: id,
      },
    });
    return res.status(200).json({ data });
  } catch (error) {
    console.log(colors.red("Error en deleteDoc"), error);
    return res.status(500).send("Error en el servidor");
  }
}
module.exports = { deleteDoc };
