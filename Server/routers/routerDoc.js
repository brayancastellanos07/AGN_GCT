const express = require("express");
// const DocController =  require("../controllers/TipoDoc/tipoDoc-get.controller.js");
// const putDocController = require("../controllers/TipoDoc/tipoDoc-post.controller.js")
// const deleteDocController = require("../controllers/TipoDoc/tipoDoc-delete.controller.js");
// const updateDocController =  require("../controllers/TipoDoc/tipoDoc-update.controller.js")

const {getDoc, getDocById, deleteDoc, postDoc, updateDoc} =  require("../controllers/TipoDoc/index.js");

const api =  express.Router();

api.get("/List-Doc", getDoc);
api.post("/Create-Doc",postDoc);
api.get("/List-Doc/:id",getDocById);
api.delete("/Delete-Doc/:id",deleteDoc);
api.put("/Update-Doc/:id",updateDoc);

module.exports = api;