const express = require("express");
const {getCarp, getCarpById, postCarp, updateCarp, deleteCarp} = require("../controllers/carpetas/index.js") 

const router = express.Router();

router.get("/list-carp",getCarp);
router.get("/list-carp/:id",getCarpById);
router.post("/create-carp",postCarp);
router.put("/update-carp/:id",updateCarp);
router.delete("/delete-carp/:id",deleteCarp);

module.exports = router;