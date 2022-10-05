const Rol = require("../../models/Rol.js");
const colors = require("colors");



async function updateRol(req, res) {
  const { id } = req.params;
  let rolsData = req.body;

  try {
    const dataUpdate = await Rol.update(
      {
        nombre: rolsData.nombre,
        descripcion: rolsData.descripcion,
      },
      {
        where: {
          id: id,
        },
      }
    );
    console.log(dataUpdate);
    return res.status(200).send({ message:"Rol actualizado correctamente. " });
  } catch (error) {
    console.log(colors.red("Error en updateRol"), error);
    return res.status(500).send({ message: "Error en el servidor"});
  }
}

module.exports = { updateRol };
