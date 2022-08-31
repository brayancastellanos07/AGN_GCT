const Rol = require("../models/Rol.js");
var Sequelize = require('sequelize');



async function getRols(req, res) {
  Rol.findAll({
    atributes: ["id", "nombre", "descripcion"],
  })
    .then((Rol) => {
      console.log(Rol.toJSON());
    })
    .catch((error) => {
      console.error('Unable to connect to the database:', error);
    });
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

module.exports = {getRols,createRol};
