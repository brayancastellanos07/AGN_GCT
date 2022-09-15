const express = require("express");
const AuthController = require("../controllers/auth/auth.js");

const router =  express.Router();

router.post("/refresh-access-token", AuthController.refreshAccessToken); 

module.exports =  router;