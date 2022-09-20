const express = require("express");
const md_auth = require("../middleware/authenticated.js");
const {getUsuario,getUsuarioActive, getUsuarioById, postUsuarios,login ,deleteUsuario} = require("../controllers/users/index.js");

const router = express.Router();

router.get("/list-usuarios",[md_auth.ensureAuth],getUsuario);
router.get("/list-usuarios-activos/:status",[md_auth.ensureAuth],getUsuarioActive)
router.get("/list-usuarios/:id",[md_auth.ensureAuth],getUsuarioById);
router.post("/create-usuarios",[md_auth.ensureAuth],postUsuarios);
router.delete("/delete-usuarios/:id",[md_auth.ensureAuth],deleteUsuario);
router.post("/login-usuarios",login);

module.exports =  router;