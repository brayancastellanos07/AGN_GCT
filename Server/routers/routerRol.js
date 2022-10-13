const express = require("express");
const {getRols,  updateRol} =  require("../controllers/rols/index.js");
const md_auth = require("../middleware/authenticated.js");


const router = express.Router();
// User Admin
router.get("/list-rol",[md_auth.ensureAuth], getRols );
router.put("/update-rol/:id",[md_auth.ensureAuth],updateRol);

module.exports = router;