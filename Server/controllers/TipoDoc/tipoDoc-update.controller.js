const Tipo_Doc = require("../../models/tipodocumento.js");
const colors = require("colors");

async function updateDoc(req, res) {
  const { id } = req.params;
  const { Tipo, Descripcion } = req.body;
  const tipo = Tipo.toLowerCase();
  const descripcion = Descripcion.toLowerCase();
  try {
    const dataUpdate = await Tipo_Doc.update(
      {
        tipo: tipo,
        descripcion: descripcion,
      },
      {
        where: {
          id_documento: id,
        },
      }
    );
    return res.status(201).json({ dataUpdate });
  } catch (error) {
    console.log(colors.red("Error en updateDoc"), error);
    return res
      .status(500)
      .send("Error en el servidor");
  }
}

module.exports = { updateDoc };
