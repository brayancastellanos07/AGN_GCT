const Conceptos = require("../../models/conceptos.js");
const colors = require("colors");
const fs = require('fs');

async function deleteConceptos(req, res) {
  const { id } = req.params;

  // obtencion de la informacion del concepto
  const dataFindConcep = await Conceptos.findOne({
    where: {
      id_concepto: id,
    },
  });
  //validación de los resultados  
  if (!dataFindConcep) {
    return res.status(404).send({ message: "No se encontraron registros. " });
  }
  //aplicando destructuring para obtener el nombre del archivo 
  const {dataValues }=  dataFindConcep;
  const{archivo} = dataValues;
  

  try {
    const data = await Conceptos.destroy({
        where:{
            id_concepto: id
        },
    });
    try {
        fs.unlinkSync('./uploads/pdfs/' + archivo);
    } catch (error) {
        console.log(colors.magenta("No se encontro el concepto"));
    }
    
    return res.status(200).send({message: "El concepto ha sido eliminado. "})
  } catch (error) {
    console.log(colors.red("Error en dataFindConcep", error));
    return res.status(500).send({message:"Error en el servidor"});
  }

}

module.exports = { deleteConceptos };
