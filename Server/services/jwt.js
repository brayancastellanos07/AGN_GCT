const jwt = require("jwt-simple");
const moment = require("moment");

const SECRET_KEY = "5MCJM3F3SzXjMyK7IbKBK9TI4ZgF6g4Z0CJvG9fY";

// creación del access token 
exports.createAccessToken = function (user) {
  const payload = {
    id: user.id_usuario,
    nombre: user.nombre,
    apellido: user.apellido,
    correo: user.correo,
    rol: user.rol,
    createToken: moment().unix(),
    exp: moment().add(3, "hours").unix(),
  };

  return jwt.encode(payload, SECRET_KEY);
};

// creación del refresh token 
exports.createRefreshToken = function(user){
    const payload = {
        id: user.id_usuario,
        exp: moment().add(30,"days").unix()
    };

    return jwt.encode(payload,SECRET_KEY);
};
// función para descodificar tokens 
exports.decodeToken =  function(token){
    return jwt.decode(token,SECRET_KEY,true);
};