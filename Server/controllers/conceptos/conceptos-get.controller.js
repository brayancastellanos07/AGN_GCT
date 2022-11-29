const fs = require("fs");
const path = require("path");
const Conceptos = require("../../models/conceptos.js");
const sequelize = require("../../database/database");
const { QueryTypes } = require("sequelize");

const colors = require("colors");

// User Admin
async function getPdfs(req, res) {
  const fileName = req.params.pdfName;
  const filePath = "./uploads/pdfs/" + fileName;

  fs.exists(filePath, (exists) => {
    if (!exists) {
      return res
        .status(404)
        .send({ message: "El Concepto que busca no esta Almacenado" });
    }

    return res.sendFile(path.resolve(filePath));
  });
}

async function getPdfId(req, res) {
  const { id } = req.params;

  try {
    const data = await Conceptos.findAll({
      where: {
        id_concepto: id,
      },
    });
    if (!data.length) {
      return res.status(404).send(`no se encontro el pdf`);
    }
    return res.status(200).json({ data });
  } catch (error) {
    console.log(colors.red("Error en getPdfId"), error);
    return res.status(500).send("Error en el servidor");
  }
}

async function getConceptos(req, res) {
  try {
    const data = await Conceptos.findAll({
      attributes: [
        "id_concepto",
        "nombre",
        "descripcion",
        "archivo",
        "fecha",
        "carpeta",
      ],
    });
    if (!data.length) {
      return res
        .status(404)
        .send({ message: "No se encontraron resgistros. " });
    }
    return res.status(200).json({ data });
  } catch (error) {
    console.log(colors.red("Error en getConceptos"), error);
    return res.status(500).send({ message: "Error en el servidor" });
  }
}

async function getConcepbyCarpByNameAdmin(req, res) {
  const { nombre } = req.params;
  try {
    const data = await sequelize.query(
      `SELECT CN.id_concepto, CN.nombre, CN.descripcion, CN.archivo, CN.fecha,CN.carpeta AS id_Carpeta,
      CA.nombre AS carpeta
	FROM conceptos AS CN 
	INNER JOIN carpetas AS CA
	ON CA.id_carpeta = CN.carpeta 
	WHERE CA.nombre = '${nombre}'`,
      { type: QueryTypes.SELECT }
    );
    if (!data.length) {
      return res.status(404).send({ message: `no se encontraron conceptos` });
    }
    return res.status(200).json({ data });
  } catch (error) {
    console.log(
      colors.red({ message: "Error en getConcepbyCarpByName" }),
      error
    );
    return res.status(500).send({ message: "Error en el servidor" });
  }
}

async function getConcepbyContenido(req, res) {
  const { contenido } = req.params;
  const Contenido = contenido.toLowerCase();
  try {
    const data = await sequelize.query(
      `SELECT CN.id_concepto, CN.nombre, CN.descripcion, CN.archivo, CN.fecha,
      CA.nombre AS carpeta
      FROM conceptos AS CN 
	  INNER JOIN carpetas AS CA
	  ON CA.id_carpeta = CN.carpeta
      WHERE CN.contenido ilike '%${Contenido}%'`,
      { type: QueryTypes.SELECT }
    );

    if (!data.length) {
      const data = await Conceptos.findAll({
        where: {
          nombre: Contenido,
        },
      });
      if (!data) {
        const data = await sequelize.query(
          `SELECT CN.id_concepto, CN.nombre, CN.descripcion, CN.archivo, CN.fecha,
          CA.nombre AS carpeta
          FROM conceptos AS CN 
        INNER JOIN carpetas AS CA
        ON CA.id_carpeta = CN.carpeta
          WHERE CN.descripcion ilike '%${Contenido}%'`,
          { type: QueryTypes.SELECT }
        );
        if (!data) {
          return res
            .status(404)
            .send({ message: "No se ha encontraron coincidencias" });
        }
        return res.status(200).json({ data });
      }
      return res.status(200).json({ data });
    }
    return res.status(200).json({ data });
  } catch (error) {
    console.log(colors.red("Error en getConcepbyContenido"), error);
    return res.status(500).send({ message: "Error en el servidor" });
  }
}

// User Visit
async function getConcepbyCarpByName(req, res) {
  const { nombre } = req.params;
  try {
    const data = await sequelize.query(
      `SELECT CN.id_concepto, CN.nombre, CN.descripcion, CN.archivo, CN.fecha,
      CA.nombre AS carpeta
	FROM conceptos AS CN 
	INNER JOIN carpetas AS CA
	ON CA.id_carpeta = CN.carpeta 
	WHERE CA.nombre = '${nombre}'`,
      { type: QueryTypes.SELECT }
    );
    if (!data.length) {
      return res
        .status(404)
        .send({ message: `no se encontraron conceptos en el año: ${nombre}` });
    }
    return res.status(200).json({ data });
  } catch (error) {
    console.log(
      colors.red({ message: "Error en getConcepbyCarpByName" }),
      error
    );
    return res.status(500).send({ message: "Error en el servidor" });
  }
}

module.exports = {
  getPdfs,
  getPdfId,
  getConceptos,
  getConcepbyCarpByName,
  getConcepbyCarpByNameAdmin,
  getConcepbyContenido,
};
