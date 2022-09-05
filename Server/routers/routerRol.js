const express = require("express");
const UserController = require("../controllers/rols/rol-get.controller.js");
const api = express.Router();

api.get("/list-rol", UserController.getRols );

module.exports = api;