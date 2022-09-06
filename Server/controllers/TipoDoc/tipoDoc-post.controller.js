const Tipo_Doc = require("../../models/tipodocumento.js");


// funcion para crear tipo de documenton
async function postDoc(req, res) {
  // obtención de los datos por medio del body
  const { Tipo, Descripcion } = req.body;
  // converción de información a minuscula
  const tipo = Tipo.toLowerCase();
  const descripcion = Descripcion.toLowerCase();
  // verificación de la creación 
  try {
    // validación si el tipo de documneto ya existe por medio del campo Tipo
    const dataFind = await Tipo_Doc.findAll({
      where: {
        tipo: tipo,
      },
    });
    // si no existe ningun registro se realiza la creación 
    if (!dataFind.length) {
      const data = await Tipo_Doc.create(
        {
          tipo,
          descripcion,
        },
        {
          fields: ["tipo", "descripcion"],
        }
      );
      return res.status(200).json({ data });
    } else {
      // si existe algun registro se informa por medio del estatus 404
      return res.status(404).send(`El tipo de documento ${tipo} ya existe! `);
    }
  } catch (error) {
    return res.status(500).send("Error en el servidor");
  }
}

module.exports = { postDoc };
