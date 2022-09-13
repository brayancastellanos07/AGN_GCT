const Usuario = require("../../models/user.js");
const Rol = require("../../models/Rol.js");
const bcrypt = require("bcrypt-nodejs");
const jwt = require("../../services/jwt.js");
// const TipoDoc = require("../../models/tipodocumento.js");
const colors = require("colors");

async function postUsuarios(req, res) {
  const {
    Nombre,
    Apellido,
    tipodocumento,
    documento,
    telefono,
    rol,
    Correo,
    contrasena,
    repetirContraseña,
    status,
  } = req.body;

  const nombre = Nombre.toLowerCase();
  const apellido = Apellido.toLowerCase();
  const correo = Correo.toLowerCase();

  try {
    const correoFind = await Usuario.findAll({
      where: {
        correo: correo,
      },
    });
    // se valida que el correo no exista
    if (correoFind.length) {
      return res
        .status(404)
        .send(`El correo ${correo} ya se encuentra inscrito en el sistema`);
    }

    const cedulaFind = await Usuario.findAll({
      where: {
        documento: documento,
      },
    });
    // // se valida que la cedula no exista
    if (cedulaFind.length) {
      return res
        .status(404)
        .send(
          `El numero de cedula ${documento} ya se encuentra inscrito en el sistema`
        );
    }

    const findRol = await Rol.findAll({
      where: {
        id: rol,
      },
    });
    // se valida que el rol exista
    if (!findRol.length) {
      return res.status(404).send(`El Rol ${rol} no existe en el sistema `);
    }

    // se valida el ingreso de las contraseñas
    if (!contrasena || !repetirContraseña) {
      res.status(404).send("Las contraseñas son obligatorias");
    } else {
      if (contrasena !== repetirContraseña) {
        res.status(404).send("Las contraseñas no son iguales");
      } else {
        bcrypt.hash(contrasena, null, null, async function (error, hash) {
          if (error) {
            res.status(500).send("Error al encriptar la contraseña");
          } else {
            //res.status(200).json({hash});
            const contrasena = hash;
            // creación del usuario
            const data = await Usuario.create(
              {
                nombre,
                apellido,
                tipodocumento,
                documento,
                telefono,
                rol,
                correo,
                contrasena,
                status,
              },
              {
                fields: [
                  "nombre",
                  "apellido",
                  "tipodocumento",
                  "documento",
                  "telefono",
                  "rol",
                  "correo",
                  "contrasena",
                  "status",
                ],
              }
            );
            return res.status(200).json({ data });
          }
        });
      }
    }
  } catch (error) {
    console.log(colors.red("Error en postUsuarios", error));
    return res.status(500).send("Error en el servidor");
  }
}

async function login(req, res) {
  const { Correo, contrasena } = req.body;
  const correo = Correo.toLowerCase();

  try {
    const data = await Usuario.findAll({
      where: {
        correo: correo,
      },
    });

    if (!data.length) {
      return res.status(404).send(`No se encontro el usuarios ${correo}`);
    }
    bcrypt.compare(contrasena, data.contrasena, (error, check) => {
      if (error) {
        console.log(colors.red("Error en bcrypt"), error);
        return res.status(500).send("Error al desencriptar");
      } else {
        if (!data.status) {
          console.log(colors.green("Error en activación de usuario"));
          return res.status(200).send("El usuario no esta activo");
        }
      }
    });
    return res.status(200).json({ data });
  } catch (error) {
    console.log(colors.red("Error en login"), error);
    return res.status(500).send("Error en el servidor");
  }
}

module.exports = { postUsuarios, login };
