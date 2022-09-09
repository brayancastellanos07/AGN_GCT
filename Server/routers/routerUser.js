const express = require("express");
const postUsuarios = require("../controllers/users/user-post.controller.js");

const router = express.Router();

router.post("/create-usuarios",postUsuarios);

module.exports =  router;