const fs = require("fs");
const path = require("path");
const Conceptos = require("../../models/conceptos.js");
const Carpetas =  require("../../models/carpetas.js");

const colors = require("colors");

async function getPdfs(req, res) {
  const fileName = req.params.pdfName;
  const filePath = "./uploads/pdfs/" + fileName;

  fs.exists(filePath, (exists) => {
    if (!exists) {
      return res
        .status(404)
        .send({ message: "El Concepto que busca no esta Almacenado" });
    }
    res.sendFile(path.resolve(filePath));
  });
}

async function getConceptos(req, res) {
  try {
    const data = await Conceptos.findAll({
      attributes: ["id_concepto","nombre", "descripcion", "archivo", "fecha", "carpeta"],
    });
    if (!data.length) {
        return res.status(404).send({message:"No se encontraron resgistros. "});
    }
    return res.status(200).json({data});
  } catch (error) {
    console.log(colors.red("Error en getConceptos"), error);
    return res.status(500).send({message:"Error en el servidor"});
  }
}

async function getConceptosByName(req,res){
    const {nombre} =  req.params
    try {
        const data =  await Conceptos.findAll({
            where:{
                nombre:nombre
            },
        });
        if (!data.length) {
            return res.status(404).send({message:`El concepto con el nombre ${nombre} no esta registrado`});
        }
        return res.status(200).json({data})
    } catch (error) {
        console.log(colors.red("Error en getConceptosByName"), error);
        return res.status(500).send({message:"Error en el servidor"})
    }
}

async function getConcepbyCarpByName(req, res){
  const {nombre} = req.params;
 
  const dataCarp = await Conceptos.findAll({
    
    include: ['carpeta']
  });
  if (!dataCarp.length) {
    return res.status(404).send(`no se encontro la carpeta con el nombre: ${nombre}`);
  }
  

  console.log(dataCarp);
 
}

module.exports = { getPdfs, getConceptos, getConceptosByName,getConcepbyCarpByName};
