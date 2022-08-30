const Rol = require('../models/Rol.js');

function getRols ( req,res ) {
    res.send('getting rol')
}

function  createRol ( req,res ) {
    const rol =  new Rol();
    const {Nombre, Descripcion} = req.body
    
    if(!Nombre) {
        res.status(404).send({message: "El nombre es obligatorio"})
    }else{
        rol.nombre = Nombre; 

    }
    if (!Descripcion){
        res.status(404).send({message: "La descripción es obligatorio"})
    }else{
        rol.descripcion = Descripcion;
    }
}

module.exports = {getRols, createRol};