const express = require("express");
const {getRols,  updateRol} =  require("../controllers/rols/index.js");

const router = express.Router();

router.get("/list-rol", getRols );
router.put("/update-rol/:id",updateRol);

module.exports = router;