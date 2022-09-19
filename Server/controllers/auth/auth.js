const jwt = require("../../services/jwt");
const moment = require("moment");
const Usuario = require("../../models/user");
const colors = require("colors");

function willExpiredToken(token) {
  // decodificación del token
  const { exp } = jwt.decodeToken(token);
  const currentDate = moment().unix();

  // si la fecha actual es mayor a la fecha de vencimiento del token
  //  retorna un true
  // de lo contraio retorna un false
  if (currentDate > exp) {
    return true;
  }
  return false;
}

async function refreshAccessToken(req, res) {
  const { refreshToken } = req.body;
  const isTokenExpired = willExpiredToken(refreshToken);

  if (isTokenExpired) {
    res.status(404).send({ message: "El refreshToken ha expirado" });
  } else {
    const { id } = jwt.decodeToken(refreshToken);

    const data = await Usuario.findOne({ where: { id_usuario: id } });
    const { dataValues } = data;

    try {
      if (!data) {
        return res.status(404).send(`No se encontro el  Usuario ${id}`);
      }

      return res.status(200).json({
        accessToken: jwt.createAccessToken(dataValues),
        refreshToken: jwt.createRefreshToken(dataValues),
      });
    } catch (error) {
      console.log(
        colors.red({ message: "Error en refreshAccessToken" }),
        error
      );
      return res.status(500).send({ message: "Error en el servidor" });
    }
  }
}

module.exports = { refreshAccessToken };
