const Conceptos = require("../../models/conceptos.js");
const Carpetas = require("../../models/carpetas.js");
const colors = require("colors");
const fs = require("fs");

// para actualizar el nombre y el archivo pdf
async function updatePdf(req, res) {
  // captura de datos enviados por parametro

  const { id } = req.params;

  try {
    if (req.files) {
      // Extracción del tipo de archivo
      let filePath = req.files.archivo.path.split("\\").join("/");
      let fileSplit = filePath.split("/");
      let fileName = fileSplit[2];
      let extSplit = fileName.split(".");
      let fileExt = extSplit[1];

      // Extraccion del nombre del archivo para el registro
      let fileOriginalName = req.files.archivo.originalFilename;
      let extSplitName = fileOriginalName.split(".");
      let finalName = extSplitName[0];

      // verificación del  tipo de archivo
      if (fileExt !== "pdf") {
        fs.unlinkSync("./uploads/pdfs/" + fileName);
        return res.status(400).send({
          message: "La extensión del archivo debe ser .pdf",
        });
      } else {
        // consulta de la existencia del concepto para actualizar
        const data = await Conceptos.findOne({
          where: {
            id_concepto: id,
          },
        });

        const { dataValues } = data;
        const conceptos = dataValues;
        const { archivo } = conceptos;

        if (!data) {
          return res
            .status(404)
            .send({ message: "No se encontraron registros. " });
        } else {
          if(archivo){
          fs.unlinkSync("./uploads/pdfs/" + archivo);
          }
        }
        
        // asignación del archivo y el nombre a las variables para registr
        conceptos.archivo = fileName;
        conceptos.nombre = finalName.toLowerCase();

        try {
          const data = await Conceptos.update(
            {
              nombre: conceptos.nombre,
              archivo: conceptos.archivo,
            },
            {
              where: {
                id_concepto: id,
              },
            }
          );
          if (!data) {
            return res
              .status(404)
              .send({ message: "No se encontró el concepto. " });
          }
          return res.status(200).send({ data });
        } catch (error) {
          fs.unlinkSync("./uploads/pdfs/" + fileName);
          console.log(colors.red("Error en updatePdf. "), error);
          return res.status(500).send({ message: "Error en el servidor. " });
        }
      }
    }
  } catch (error) {
    fs.unlinkSync("./uploads/pdfs/" + fileName);
    console.log(colors.red("Error en updatePdf. "), error);
    return res.status(500).send({ message: "Error en el servidor. " });
  }
}

// actualiza la información del registro del PDF
async function updateConcepto(req, res) {
  let conceptData = req.body;
  conceptData.carpeta = parseInt(req.body.carpeta);
  const { id } = req.params;

  try {
    if (conceptData.carpeta) {
      const carpetaFind = await Carpetas.findAll({
        where: {
          id_carpeta: conceptData.carpeta,
        },
      });
      if (!carpetaFind.length) {
        return res.status(404).send({ message: "La carpeta no Existe." });
      }
    }

    // actualización de los datos en la base de datos
    const data = await Conceptos.update(
      {
        descripcion: conceptData.descripcion,
        fecha: conceptData.fecha,
        carpeta: conceptData.carpeta,
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

    return res
      .status(200)
      .send({ message: "Concepto modificado de forma exitosa. " });
  } catch (error) {
    console.log(colors.red("Error en Concepto. "), error);
    return res.status(500).send({ message: "Error en el servidor. " });
  }
}

module.exports = { updateConcepto, updatePdf };
