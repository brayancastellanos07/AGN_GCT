const Rol =  require("../../models/Rol.js");


async function updateRol(req,res){
    const {id} = req.params;
    const {Nombre,Descripcion,Status} = req.body;
    if (!Status) {
        Status === false
    }
    try {
        
        const dataUpdate = await Rol.update(
            {
                nombre: Nombre,
                descripcion: Descripcion,
                status:Status,
            },{
                where:{
                    id:id,
                }
            }
        );
        return res.status(201).json({dataUpdate});
    } catch (error) {
        return res.status(500).send("Error en el servidor, Update Rol")
    }
}

module.exports =  {updateRol};