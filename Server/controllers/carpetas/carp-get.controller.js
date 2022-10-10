const Carpetas = require("../../models/carpetas.js");
const colors = require("colors");
const sequelize = require("../../database/database");
const { QueryTypes } = require("sequelize");

async function getCarp(req, res) {
  try {
    const data = await sequelize.query(
      `SELECT id_carpeta, nombre, descripcion FROM public.carpetas ORDER BY nombre ASC`,
      { type: QueryTypes.SELECT }
    );
    if (!data.length) {
      return res.status(404).send({ message:"No se encontraron Registros"});
    }

    return res.status(200).json({data});
  } catch (error) {
    console.log(colors.red("Error en getCarp", error));
    return res.status(500).send({message: "Error en el servidor"});
  }
}
async function getCarpMenu(req, res) {
  try {
    const data = await sequelize.query(
      `SELECT  nombre
    FROM public.carpetas
    ORDER BY nombre ASC`,
      { type: QueryTypes.SELECT }
    );
    if (!data.length) {
      return res.status(404).send("No se encontraron Registros");
    }
  
    return res.status(200).json({ data });
  } catch (error) {
    console.log(colors.red("Error en getCarpMenu", error));
    return res.status(500).send("Error en el servidor");
  }
}

async function getCarpById(req, res) {
  const { id } = req.params;
  try {
    const data = await Carpetas.findAll({
      where: {
        id_carpeta: id,
      },
    });
    if (!data.length) {
      return res.status(404).send(`no se encontro la carpeta con el id: ${id}`);
    }
    return res.status(200).json({ data });
  } catch (error) {
    console.log(colors.red("Error en getCarpById"), error);
    return res.status(500).send("Error en el servidor");
  }
}

module.exports = { getCarp, getCarpById, getCarpMenu };
