const Conceptos = require("../../models/conceptos.js");
const colors = require("colors");
const Carpetas = require("../../models/carpetas.js");
const fs = require("fs");
const PdfParse = require("pdf-parse");

async function postConceptos(req, res) {
   // Extracción del tipo de archivo
  let fileOriginalName = req.files.archivo.originalFilename;
  const filePathPdf = "./uploads/pdfs/" + fileOriginalName;
  let filePath = req.files.archivo.path.split("\\").join("/");
  let fileSplit = filePath.split("/");
  let fileName = fileSplit[2];
  let extSplit = fileName.split(".");
  let fileExt = extSplit[1];

  // verificación de que el archivo que se va a subir no exista en el directorio local
  if (fs.existsSync(filePathPdf)) {
    fs.unlinkSync("./uploads/pdfs/" + fileName);
    return res
      .status(404)
      .send({ message: "El Concepto que intenta crear ya existe" });
  } else {
    // si el archivo no existe se almacena y crea el registro 
    try {
      if (req.files) {
        // verificación de la extensión del archivo
        if (fileExt !== "pdf") {
          fs.unlinkSync("./uploads/pdfs/" + fileName);
          return res.status(400).send({
            message: "La extensión del archivo debe ser .pdf",
          });
        } else {
          const pdfFile = fs.readFileSync("./uploads/pdfs/" + fileName);

          // esta funcion sirve para obtener el texto del pdf
          const Pdfcontenido = await PdfParse(pdfFile).then((resultado) => {
            return resultado.text;
          });
          // eliminación de los salto de linea
          const contenido = Pdfcontenido.split("\n").join("");

          let fileOriginalName = req.files.archivo.originalFilename;
          let extSplitName = fileOriginalName.split(".");
          let finalName = extSplitName[0];
          req.body.nombre = finalName.toLowerCase();
          req.body.carpeta = parseInt(req.body.carpeta);
          req.body.archivo = fileOriginalName;
          fs.renameSync(
            "./uploads/pdfs/" + fileName,
            "./uploads/pdfs/" + fileOriginalName
          );

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

            const data = Conceptos.create(
              {
                nombre,
                descripcion,
                archivo,
                fecha,
                carpeta,
                contenido,
              },
              {
                fields: [
                  "nombre",
                  "descripcion",
                  "archivo",
                  "fecha",
                  "carpeta",
                  "contenido",
                ],
              }
            );

            return res.status(200).send({
              message: "El Concepto se ha almacenado de forma correcta. ",
            });
          } catch (error) {
            fs.unlinkSync("./uploads/pdfs/" + fileOriginalName);
            console.log(colors.red("Error en postConceptos"), error);
            return res.status(500).send({ message: "Error en el servidor" });
          }
        }
      }
    } catch (error) {
      fs.unlinkSync("./uploads/pdfs/" + fileName);
      console.log(colors.red("Error en crearConcepto. "), error);
      return res.status(500).send({ message: "Error en el servidor. " });
    }
  }
}

module.exports = { postConceptos };
