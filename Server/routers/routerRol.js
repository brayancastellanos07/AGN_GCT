const express = require("express");
const UserController = require("../controllers/rols/rol-get.controller.js");
const UpdateController = require("../controllers/rols/rol-update.controller.js"); 
const api = express.Router();

api.get("/List-rol", UserController.getRols );
api.put("/Update-rol/:id",UpdateController.updateRol);

module.exports = api;