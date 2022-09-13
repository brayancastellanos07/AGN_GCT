const Usuario =  require("../../models/user.js");
const colors = require("colors");

async function deleteUsuario(req,res){
    try {
        const {id} = req.params;
        const data =  await Usuario.destroy({
            where:{
                id:id,
            },
        });
        return res.status(200).json({ data });
    } catch (error) {
        console.log(colors.red("Error en deleteUsuario"),error);
        return res.status(500).send("Error en el servidor");   
    }
}

module.exports = {deleteUsuario};