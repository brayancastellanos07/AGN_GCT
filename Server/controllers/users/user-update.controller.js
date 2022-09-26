const Usuario = require("../../models/user.js");
const colors = require("colors");
const { use } = require("../../routers/routerUser.js");

async function updateAvatar(req, res) {
  const { id } = req.params;
  try {
    const data = await Usuario.findOne({
      where: {
        id_usuario: id,
      },
    });
    if (!data) {
      return res
        .status(404)
        .send({ message: "No se ha encontrado ningun usuario" });
    }
    const { dataValues } = data;
    const user = dataValues;
    if (req.files) {
      let filePath = req.files.avatar.path.split("\\").join("/");
      let fileSplit = filePath.split("/");
      let fileName = fileSplit[2];
      let extSplit = fileName.split(".");
      let fileExt = extSplit[1];
      if (fileExt !== "png" && fileExt !== "jpg") {
        return res.status(400).send({
          message:
            "La extensión de la imagen no es valida. (Extrensiones permitidas: .png y .jpg )",
        });
      } else {
        user.avatar = fileName;

        console.log("aqui", user);
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
              .send({ message: "No se encontro el usuario" });
          }
          return res.status(200).send({ datauser });
        } catch (error) {
          console.log(colors.red("Error en updateAvatar"), error);
          return res.status(500).send({ message: "Error en el servidor" });
        }
      }
    }
  } catch (error) {
    console.log(colors.red("Error en updateAvatar"), error);
    return res.status(500).send({ message: "Error en el servidor" });
  }
}
async function updateUser(req, res) {
  const userData = req.body;
  const { id } = req.params;
  console.log(userData.Nombre)
  try {
    const data = await Usuario.update(
      {
        nombre: userData.Nombre,
        apellido: userData.Apellido,
        tipodocumento: userData.tipodocumento,
        documento: userData.documento,
        telefono: userData.telefono,
        rol: userData.rol,
        correo: userData.Correo,
        contrasena: userData.contrasena,
        status: userData.status,
        avatar: userData.avatar,
      },
      {
        where: {
          id: id,
        },
      }
    );
    return res.status(200).json({ data });
  } catch (error) {
    console.log(colors.red("Error en updateUser", error));
    return res.status(500).send({ message: "Error en el servidor " });
  }
}

module.exports = { updateUser, updateAvatar };
