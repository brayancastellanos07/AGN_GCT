const express = require("express");
const {postConceptos, getPdfs,getPdfId,getConceptos, getConcepbyContenido, updateConcepto, deleteConceptos,getConcepbyCarpByName,getConcepbyCarpByNameAdmin,updatePdf} = require("../controllers/conceptos/index.js");
const multipart = require("connect-multiparty");
const md_auth = require("../middleware/authenticated.js");
const md_update_pdfs = multipart({ uploadDir: "./uploads/pdfs" });

const router =  express.Router();

// user admin
router.get("/get-conceptos",[md_auth.ensureAuth], getConceptos)
router.get("/get-pdfs/:pdfName",getPdfs);
router.get("/get-pdfsId/:id",[md_auth.ensureAuth],getPdfId);
router.get("/Admin/list-conceptos/:nombre",[md_auth.ensureAuth],getConcepbyCarpByNameAdmin);
router.get("/list-conceptos-contenido/:contenido",getConcepbyContenido);
router.post("/create-concepto",[md_auth.ensureAuth,md_update_pdfs],postConceptos);
router.put("/update-conceptos/:id",[md_auth.ensureAuth,md_update_pdfs],updateConcepto);
router.put("/update-pdf/:id",[md_auth.ensureAuth,md_update_pdfs], updatePdf);
router.delete("/delete-conceptos/:id",[md_auth.ensureAuth], deleteConceptos);


// user visit
router.get("/list-conceptos/:nombre",getConcepbyCarpByName);
module.exports = router;