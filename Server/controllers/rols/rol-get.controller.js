const Rol = require("../../models/Rol.js");
const colors = require("colors");

async function getRols(req, res) {
  try {
    const data = await Rol.findAll({
      atributes: ["id", "nombre", "descripcion"],
    });
    if (!data.length) {
      return res.status(404).send({message: "No se encontraron registros. "});
    }
    return res.status(200).json({ data });
  } catch (error) {
    console.log(colors.red("Error en updateRol"), error);
    return res.status(500).send( { message: "Error en el servidor"});
  }
}

module.exports = { getRols }; 
