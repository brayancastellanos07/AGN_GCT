const express = require("express");
const {getUsuario, getUsuarioById, postUsuarios,login ,deleteUsuario} = require("../controllers/users/index.js");

const router = express.Router();

router.get("/list-usuarios",getUsuario);
router.get("/list-usuarios/:id",getUsuarioById);
router.post("/create-usuarios",postUsuarios);
router.delete("/delete-usuarios/:id",deleteUsuario);
router.post("/login-usuarios",login);

module.exports =  router;