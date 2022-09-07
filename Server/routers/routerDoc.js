const express = require("express");
const {getDoc, getDocById, deleteDoc, postDoc, updateDoc} =  require("../controllers/TipoDoc/index.js");

const router =  express.Router();

router.get("/list-doc", getDoc);
router.post("/create-doc",postDoc);
router.get("/list-doc/:id",getDocById);
router.delete("/delete-doc/:id",deleteDoc);
router.put("/update-doc/:id",updateDoc);

module.exports = router;