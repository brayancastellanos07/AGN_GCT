const Usuario = require("../../models/user.js");
const colors = require("colors");
const bcrypt = require("bcrypt-nodejs");
const fs = require("fs");

async function updateAvatar(req, res) {
  const { id } = req.params;

  try {
    if (req.files) {
      console.log(req.files)
      let filePath = req.files.avatar.path.split("\\").join("/");
      let fileSplit = filePath.split("/");
      let fileName = fileSplit[2];
      let extSplit = fileName.split(".");
      let fileExt = extSplit[1];

      // verificación del  tipo de archivo
      if (fileExt !== "png" && fileExt !== "jpg") {
        fs.unlinkSync("./uploads/avatar/" + fileName);
        return res.status(400).send({
          message:
            "La extensión de la imagen no es válida. (Extensiones permitidas: .png y .jpg )",
        });
      } else {
        const data = await Usuario.findOne({
          where: {
            id_usuario: id,
          },
        });

        const { dataValues } = data;
        const user = dataValues;
        const { avatar } = user;

        if (!data) {
          return res
            .status(404)
            .send({ message: "No se ha encontrado ningún usuario. " });
        } else {
          if (avatar) {
            fs.unlinkSync("./uploads/avatar/" + avatar);
          }
        }

        user.avatar = fileName;

        try {
          const datauser = await Usuario.update(
            {
              avatar: user.avatar,
            },
            {
              where: {
                id_usuario: id,
              },
            }
          );
          if (!datauser) {
            return res
              .status(404)
              .send({ message: "No se encontró el usuario. " });
          }
          return res.status(200).send({ datauser });
        } catch (error) {
          fs.unlinkSync("./uploads/avatar/" + fileName);
          console.log(colors.red("Error en updateAvatar. "), error);
          return res.status(500).send({ message: "Error en el servidor. " });
        }
      }
    }
  } catch (error) {
    //fs.unlinkSync("./uploads/avatar/" + fileName);
    console.log(colors.red("Error en updateAvatar. "), error);
    return res.status(500).send({ message: "Error en el servidor. " });
  }
}


async function updateUser(req, res) {
  const { id } = req.params;
  let userData = req.body;
  if (userData.correo) {
    userData.correo = req.body.correo.toLowerCase();
  }

  if (userData.contrasena) {
    await bcrypt.hash(userData.contrasena, null, null, (err, hash) => {
      if (err) {
        return res
          .status(500)
          .send({ message: "Error al encriptar la contraseña. " });
      } else {
        userData.contrasena = hash;
      }
    });
  } else {
    delete userData.contrasena;
  }

  try {
    const data = await Usuario.update(
      {
        nombre: userData.nombre,
        apellido: userData.apellido,
        tipodocumento: userData.tipodocumento,
        documento: userData.documento,
        telefono: userData.telefono,
        rol: userData.rol,
        status: userData.status,
        correo: userData.correo,
        contrasena: userData.contrasena,
        //avatar: userData.avatar,
      },
      {
        where: {
          id: id,
        },
      }
    );
    return res
      .status(200)
      .send({ message: "Usuario actualizado correctamente. " });
  } catch (error) {
    console.log(colors.red("Error en updateUser. ", error));
    return res.status(500).send({ message: "Error en el servidor.  " });
  }
}

async function activateUser(req, res) {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const data = await Usuario.update(
      {
        status: status,
      },
      {
        where: {
          id: id,
        },
      }
    );
    if (status === true) {
      return res.status(200).send({ message: "El usuario ha sido activado. " });
    }
    return res
      .status(200)
      .send({ message: "El usuario ha sido desactivado. " });
  } catch (error) {
    console.log(colors.red("Error en activateUser. ", error));
    return res.status(500).send({ message: "Error en el servidor. " });
  }
}

module.exports = { updateUser, updateAvatar, activateUser };
