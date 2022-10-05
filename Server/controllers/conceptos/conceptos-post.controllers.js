const Conceptos = require("../../models/conceptos.js");
const colors = require("colors");
const Carpetas = require("../../models/carpetas.js");
const fs = require('fs');

async function postConceptos(req, res) {
  if (req.files) {
    let filePath = req.files.concepto.path.split("\\").join("/");
    let fileSplit = filePath.split("/");
    let fileName = fileSplit[2];
    let extSplit = fileName.split(".");
    let fileExt = extSplit[1];

    if (fileExt !== "pdf") {
      fs.unlinkSync('./uploads/pdfs/' + fileName);
      return res.status(400).send({
        message: "La extensión del archivo debe ser .pdf",
      });
      
    } else {

      req.body.archivo = fileName;

      let fileOriginalName = req.files.concepto.originalFilename;
      let extSplitName = fileOriginalName.split(".");
      let finalName = extSplitName[0];

      req.body.nombre = finalName.toLowerCase();
      req.body.carpeta = parseInt(req.body.carpeta);

      try {
        const carpetaFind = await Carpetas.findAll({
          where: {
            id_carpeta: req.body.carpeta,
          },
        });
        if (!carpetaFind.length) {
          return res.status(404).send({ message: "La carpeta no Existe." });
        }
        const { nombre, descripcion, fecha, archivo, carpeta } = req.body;
      
        const data = await Conceptos.create(
          {
            nombre,
            descripcion,
            archivo,
            fecha,
            carpeta,
          },
          {
            fields: ["nombre", "descripcion", "archivo", "fecha", "carpeta"],
          }
        );
        return res.status(200).send({
          message: "El Concepto se ha almacenado de forma correcta. ",
        });
      } catch (error) {
        console.log(colors.red("Error en postConceptos"), error);
        return res.status(500).send({ message: "Error en el servidor" });
      }
    }
  }
}

module.exports = { postConceptos };
