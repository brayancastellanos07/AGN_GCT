const express = require("express");
const DocController =  require("../controllers/TipoDoc/tipoDoc-get.controller.js");
const putDocController = require("../controllers/TipoDoc/tipoDoc-post.controller.js")
const deleteDocController = require("../controllers/TipoDoc/tipoDoc-delete.controller.js");

const api =  express.Router();

api.get("/List-Doc", DocController.getDoc);
api.post("/Create-Doc",putDocController.postDoc);
api.get("/List-Doc/id",DocController.getDocById);
api.get("/Delete-Doc:id",deleteDocController.deleteDoc);

module.exports = api;