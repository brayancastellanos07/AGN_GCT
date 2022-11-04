const Usuario = require("../../models/user.js");
const colors = require("colors");
const fs = require('fs');

async function deleteUsuario(req, res) {
  const { id } = req.params;

  // obtencion de la información del usuario para eliminar el avatar

  const  dataUser = await Usuario.findOne({
    where:{
      id_usuario: id
    },
  });
  //validación de los resultados
  if (!dataUser) {
    return res.status(404).send({ message: "No se encontraron registros. " });
  }

  const {dataValues }=  dataUser;
  const{avatar} = dataValues;
  //aplicando destructuring para obtener el nombre del archivo 
  try {
  
    const data = await Usuario.destroy({
      where: {
        id_usuario: id,
      },
    });

    // si el usuario tienen un avatar asigando se elimina 
    if(avatar){
      fs.unlinkSync('./uploads/avatar/' + avatar);
    }
   
    return res.status(200).send({ message:"El usuario ha sido Eliminado." });
  } catch (error) {
    console.log(colors.red({ message:"Error en deleteUsuario." }), error);
    return res.status(500).send({ message:"Error en el servidor." });
  }
}

module.exports = { deleteUsuario };
 