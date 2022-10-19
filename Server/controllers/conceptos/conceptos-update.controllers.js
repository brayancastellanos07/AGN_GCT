const Conceptos = require("../../models/conceptos.js");
const Carpetas = require("../../models/carpetas.js");
const colors = require("colors");
const fs =  require('fs');

async function updateConcepto(req, res) {
  // captura de datos enviados por parametro y por body  
  const { id } = req.params;
  let concepData = req.body;
  // consulta de la existencia del concepto para actualizar
  const data = await Conceptos.findOne({
    where: {
      id_concepto: id,
    },
  });
  if (!data) {
    return res.status(404).send({ message: "No se encontraron registros. " });
  }
  const { dataValues } = data;
  const conceptos = dataValues;

  // si se recibe algun archivo validar sus datos y obtener sus parametros
  if (req.files) {
    // Extracción del tipo de archivo
    let filePath = req.files.concepto.path.split("\\").join("/");
    let fileSplit = filePath.split("/");
    let fileName = fileSplit[2];
    let extSplit = fileName.split(".");
    let fileExt = extSplit[1];

    // Extraccion del nombre del archivo para el registro
    let fileOriginalName = req.files.concepto.originalFilename;
    let extSplitName = fileOriginalName.split(".");
    let finalName = extSplitName[0];

    // verificación del  tipo de archivo
    if (fileExt !== "pdf") {
      fs.unlinkSync('./uploads/pdfs/' + fileName);
      return res.status(400).send({
        message: "La extensión del archivo debe ser .pdf",
      });
    }
  } else{
    // asignación del archivo y el nombre a las variables para registro
    conceptos.archivo = fileName;
    conceptos.nombre = finalName.toLowerCase();

    try {
      // consulta de la existencia de la carpeta
      const carpeta = parseInt(req.body.carpeta);
      if (req.body.carpeta) {
        const carpetaFind = await Carpetas.findAll({
          where: {
            id_carpeta: carpeta,
          },
        });
        if (!carpetaFind.length) {
          return res.status(404).send({ message: "La carpeta no Existe." });
        }
      }
      // actualización de los datos en la base de datos
      // el nombre y el archivo se recuperan del pdf subido, la demas información se obtiene del body
      const data = await Conceptos.update(
        {
          nombre: conceptos.nombre,
          descripcion: concepData.descripcion,
          archivo: conceptos.archivo,
          fecha: concepData.fecha,
          carpeta: concepData.carpeta,
        },
        {
          where: {
            id_concepto: id,
          },
        }
      );
      // verificación de la modificación del usuario 
      if (!data) {
        return res.status.send({ message: "No se encontro el usuario" });
      }
      return res.status(200).send({ message: "Usuario modificado de forma exitosa. " });
    } catch (error) {
      console.log(colors.red("Error en updateAvatar. "), error);
      return res.status(500).send({ message: "Error en el servidor. " });
    }
  }
}

module.exports = { updateConcepto };
