const jwt = require('../../services/jwt');
const moment = require("moment");
const Usuario = require("../../models/user"); 

function willExpiredToken(token){
    // decodificación del token 
    const {exp} =  jwt.decodeToken(token);   
    const currentDate = moment().unix();
    
    // si la fecha actual es mayor a la fecha de vencimiento del token 
    //  retorna un true 
    // de lo contraio retorna un false 
    if (currentDate > exp) {
        return true;
    }
    return false;
}

function refreshAccessToken(req, res){
    const {refreshToken} =  req.body;
    const isTokenExpired = willExpiredToken(refreshToken);
    
    if (isTokenExpired) {
        res.status(404).send({message: "El refreshToken ha expirado"}); 
    }else{
        //Usuario.findOne()
    }
}

module.exports = {refreshAccessToken};