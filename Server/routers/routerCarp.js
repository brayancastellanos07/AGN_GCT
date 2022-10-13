const express = require("express");
const {getCarp, getCarpById, postCarp, updateCarp, deleteCarp,getCarpMenu} = require("../controllers/carpetas/index.js") 
const md_auth = require("../middleware/authenticated");

const router = express.Router();
//User Admin
router.get("/list-carp",[md_auth.ensureAuth],getCarp);
router.get("/list-carp/:id",[md_auth.ensureAuth],getCarpById);
router.post("/create-carp",[md_auth.ensureAuth],postCarp);
router.put("/update-carp/:id",[md_auth.ensureAuth],updateCarp);
router.delete("/delete-carp/:id",[md_auth.ensureAuth],deleteCarp);

// User visit
router.get("/list-carp-home",getCarp);
router.get("/list-carp-menu",getCarpMenu);
module.exports = router;