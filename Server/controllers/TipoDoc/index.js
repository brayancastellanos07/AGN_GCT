const deleteDoc = require("../TipoDoc/tipoDoc-delete.controller.js");
const getmethods  =  require("../TipoDoc/tipoDoc-get.controller");
const postDoc = require("../TipoDoc/tipoDoc-post.controller");
const updateDoc = require("../TipoDoc/tipoDoc-update.controller");

module.exports = {
    ...deleteDoc,
    ...getmethods,
    ...postDoc,
    ...updateDoc
}