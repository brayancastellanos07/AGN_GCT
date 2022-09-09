const Usuario = require("../../models/user.js");
// const Rol = require("../../models/Rol.js");
// const TipoDoc = require("../../models/tipodocumento.js");
const colors = require("colors");

async function postUsuarios(req, res){
    const {Nombre, Apellido, idDocumento, documento, telefono, idRol, Correo, contraseña, status} = req.body;

    const nombre = Nombre.toLowerCase();
    const apellido =  Apellido.toLowerCase();
    const correo = Correo.toLowerCase();

    try {
        const correoFind = await Usuario.findAll({
            where:{
             correo: correo,                   
            },
        });
        const cedulaFind =  await Usuario.findAll({
            where:{
                documento: documento,
            }
        });
        const findRol = await Rol.findAll({
            where:{
                id: idRol,
            }
        });
        const findTipoDoc = await TipoDoc.findAll({
            where:{
                id:idDocumento,
            }
        });
        // se valida que el correo no exista
        if (correoFind.length){
            return res.status(404).send(`El correo ${correo} ya se encuentra inscrito en el sistema`);
        };
        // se valida que la cedula no exista 
        if (cedulaFind.length) {
            return res.status(404).send(`El numero de cedula ${documento} ya se encuentra inscrito en el sistema`);
        };
        
        if(!findRol.length){
            return res.status(404).send(`El Rol ${idRol} no existe en el sistema `);
        };
        if(!findTipoDoc.length){
            return res.status(404).send(`El Tipo de documento ${idDocumento} no existe`);

        };
        const data = await Usuario.create(
            {
                nombre,
                apellido,
                idDocumento,
                documento,
                telefono,
                idRol,
                correo,
                contraseña,
                status,
            },
            {
                fields:["nombre","apellido","id_documento","documento","telefono","rol","contrasena", "status"],
            }
        );
        return res.status(200).json({data});
    } catch (error) {
        console.log(colors.red("Error en postUsuarios", error));
        return res.status(500).send("Error en el servidor");
    }
} 

module.exports = {postUsuarios};

