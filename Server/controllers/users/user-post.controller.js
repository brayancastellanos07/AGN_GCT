const Usuario = require("../../models/user.js");
const Rol = require("../../models/Rol.js");
const bcrypt = require("bcrypt-nodejs");
const jwt = require("../../services/jwt.js");
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
    repetirContrasena,
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
    if (!contrasena || !repetirContrasena) {
      res.status(404).send("Las contraseñas son obligatorias");
    } else {
      if (contrasena !== repetirContrasena) {
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
  const { email, password } = req.body;
  const correo = email.toLowerCase();

  try {
    const data = await Usuario.findOne({ where: { correo: correo } });
    // destructuring para obtener la información del usuario de la data
    const { dataValues } = data;
    const { contrasena, status, nombre } = dataValues;

    if (!data) {
      return res.status(404).send({ message: `No se encontro el usuarios ${correo}`});
    } else if (status === false) {
      return res.status(404).send({message: `El usuario ${nombre} no esta activo`});
    } else {
      // Comparación de la contraseña encriptada y la ingresada por el usuario
      bcrypt.compare(password, contrasena, (error, check) => {
        if (error) {
          console.log(colors.red("Error en bcrypt"), error);
          return res.status(500).send("Error al desencriptar");
        } else if (!check) {
          return res.status(404).send({message: "La contraseña es incorrecta"});
        } else {
          return res.status(200).json({
            accessToken: jwt.createAccessToken(dataValues),
            refreshToken: jwt.createRefreshToken(dataValues),
          });
        }
      });
    }
  } catch (error) {
    console.log(colors.red({ message: "Error en login" }), error);
    return res.status(500).send({ message: `Error en el servidor, No se encontro el usuarios ${correo}` });
  }
}

module.exports = { postUsuarios, login };
