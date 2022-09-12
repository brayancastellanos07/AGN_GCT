const Usuario = require("../../models/user.js");
//const Rol = require("../../models/Rol.js");
// const TipoDoc = require("../../models/tipodocumento.js");
const colors = require("colors");

async function postUsuarios(req, res){
    const {Nombre, Apellido, tipodocumento, documento, telefono, rol, Correo, contrasena, status} = req.body;
    
    const nombre = Nombre.toLowerCase();
    const apellido =  Apellido.toLowerCase();
    const correo = Correo.toLowerCase();
    
    try {
        const correoFind = await Usuario.findAll({
            where:{
             correo: correo,                   
            },
        });
         // se valida que el correo no exista
         if (correoFind.length){
            return res.status(404).send(`El correo ${correo} ya se encuentra inscrito en el sistema`);
        };
        
        const cedulaFind =  await Usuario.findAll({
            where:{
                documento: documento,
            }
        });
        // // se valida que la cedula no exista 
        if (cedulaFind.length) {
            return res.status(404).send(`El numero de cedula ${documento} ya se encuentra inscrito en el sistema`);
        };
        
        console.log("aqui toy", tipodocumento, documento)
        // const findRol = await Rol.findAll({
        //     where:{
        //         id: idRol,
        //     }
        // });

       
        
        // if(!findRol.length){
        //     return res.status(404).send(`El Rol ${idRol} no existe en el sistema `);
        // };
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
                fields:["nombre","apellido","tipodocumento","documento","telefono","rol","correo","contrasena", "status"],
            }
        );
        return res.status(200).json({data});
    } catch (error) {
        console.log(colors.red("Error en postUsuarios", error));
        return res.status(500).send("Error en el servidor");
    }
} 

module.exports = {postUsuarios};

