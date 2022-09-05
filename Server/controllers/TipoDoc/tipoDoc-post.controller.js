const Tipo_Doc = require("../../models/tipodocumento.js");

async function postDoc(req, res) {
  
  const {tipo, descripcion} = req.body;
  try {
 
    const data = await Tipo_Doc.create({
        tipo, 
        descripcion,
      },{
        fields:["tipo","descripcion"]
      }
      );
    return res.status(200).json({ data });
  } catch (error) {
    return res.status(500).send("Error en el servidor");
  }
}

module.exports = {postDoc};
