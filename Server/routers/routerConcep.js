const express = require("express");
const {postConceptos, getPdfs,getConceptos, getConceptosByName, updateConcepto, deleteConceptos,getConcepbyCarpByName,getConcepbyCarpByNameAdmin} = require("../controllers/conceptos/index.js");
const multipart = require("connect-multiparty");
const md_auth = require("../middleware/authenticated.js");
const md_update_pdfs = multipart({ uploadDir: "./uploads/pdfs" });

const router =  express.Router();

// user admin
router.get("/get-conceptos",[md_auth.ensureAuth], getConceptos)
router.get("/get-conceptos/:nombre",[md_auth.ensureAuth],getConceptosByName)
router.get("/get-pdfs/:pdfName", [md_auth.ensureAuth],getPdfs);
router.get("/Admin/list-conceptos/:nombre",[md_auth.ensureAuth],getConcepbyCarpByNameAdmin);
router.post("/create-concepto",[md_auth.ensureAuth,md_update_pdfs],postConceptos);
router.put("/update-conceptos/:id",[md_auth.ensureAuth,md_update_pdfs],updateConcepto);
router.delete("/delete-conceptos/:id",[md_auth.ensureAuth], deleteConceptos);    

// user visit
router.get("/list-conceptos/:nombre",getConcepbyCarpByName);
module.exports = router;