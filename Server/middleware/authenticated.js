const jwt = require("jwt-simple");
const moment = require("moment");

const SECRET_KEY = "5MCJM3F3SzXjMyK7IbKBK9TI4ZgF6g4Z0CJvG9fY"; 

exports.ensureAuth =(req,res,next)=>{
    if(!req.headers.authorization){
        return res.status(403).send({message:"La petición no tiene cabecera de Autenticación"})
    }

    const token = req.headers.authorization.replace(/['"]+/g, "");

    try {
        var payload = jwt.decode(token, SECRET_KEY);

        if(payload.exp <= moment.unix()){
            return res.status(404).send({message: "El token ha expirado"});
        }
    } catch (error) {
        return  res.status(404).send({message: "El Token no es valido "});
    }

    req.user =  payload;

    next();
};