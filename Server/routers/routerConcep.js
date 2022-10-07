const express = require("express");
const {postConceptos, getPdfs,getConceptos, getConceptosByName, updateConcepto, deleteConceptos,getConcepbyCarpByName} = require("../controllers/conceptos/index.js");
const multipart = require("connect-multiparty");
const md_auth = require("../middleware/authenticated.js");
const md_update_pdfs = multipart({ uploadDir: "./uploads/pdfs" });

const router =  express.Router();
router.get("/get-conceptos", getConceptos)
router.get("/get-conceptos/:nombre",getConceptosByName)
router.get("/get-pdfs/:pdfName", getPdfs);
router.get("/list-conceptos/:nombre",getConcepbyCarpByName);
router.post("/create-concepto",[md_auth.ensureAuth,md_update_pdfs],postConceptos);
router.put("/update-conceptos/:id",[md_auth.ensureAuth,md_update_pdfs],updateConcepto);
router.delete("/delete-conceptos/:id",[md_auth.ensureAuth], deleteConceptos);    
module.exports = router;