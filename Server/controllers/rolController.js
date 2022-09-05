const Rol = require("../models/Rol.js");
var Sequelize = require('sequelize');



async function getRols(req, res) {

  try {
    const data = await Rol.findAll({
      atributes: ["id", "nombre", "descripcion"],
    })
    if(!data.length){
       return res.status(404).send("No se encontraron registros ")
    }
    return res.status(200).json({data})

  } catch (error) {
    return res.status(500).send("Error en el servidor");
  }
}

function createRol(req, res) {
  const rol = new Rol();
  const { Nombre, Descripcion } = req.body;

  if (!Nombre) {
    res.status(404).send({ message: "El nombre es obligatorio" });
  } else {
    rol.nombre = Nombre;
  }
  if (!Descripcion) {
    res.status(404).send({ message: "La descripción es obligatorio" });
  } else {
    rol.descripcion = Descripcion;
  }
}

module.exports = { getRols, createRol };
