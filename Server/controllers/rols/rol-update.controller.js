const Rol = require("../../models/Rol.js");
const colors = require("colors");

async function updateRol(req, res) {
  const { id } = req.params;
  const { Nombre, Descripcion } = req.body;
  let { Status } = req.body;
  if (!Status) {
    Status = false;
  }
  try {
    const dataUpdate = await Rol.update(
      {
        nombre: Nombre,
        descripcion: Descripcion,
        status: Status,
      },
      {
        where: {
          id: id,
        },
      }
    );
    return res.status(200).json({ dataUpdate });
  } catch (error) {
    console.log(colors.red("Error en updateRol"), error);
    return res.status(500).send("Error en el servidor, Update Rol");
  }
}

module.exports = { updateRol };
