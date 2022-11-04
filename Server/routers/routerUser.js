const express = require("express");
const {
  getUsuario,
  getUsuarioActive,
  getUsuarioById,
  getAvatar,
  postUsuarios,
  login,
  deleteUsuario,
  updateAvatar,
  updateUser,
  activateUser,
} = require("../controllers/users/index.js");
const multipart = require("connect-multiparty");

const md_auth = require("../middleware/authenticated.js");
const md_update_avatar = multipart({ uploadDir: "./uploads/avatar" });

const router = express.Router();
// User Admin
router.get("/list-usuarios", [md_auth.ensureAuth], getUsuario);
router.get(
  "/list-usuarios-activos/:status",
  [md_auth.ensureAuth],
  getUsuarioActive
);
router.get("/list-usuarios/:nombre", [md_auth.ensureAuth], getUsuarioById);
router.get("/get-avatar/:avatarName", getAvatar);
router.post("/create-usuarios", [md_auth.ensureAuth], postUsuarios);
router.post("/login-usuarios", login);
router.put("/update-user/:id", [md_auth.ensureAuth], updateUser);
router.put(
  "/update-avatar/:id",
  [md_auth.ensureAuth, md_update_avatar],
  updateAvatar
);
router.put("/activate-user/:id", [md_auth.ensureAuth], activateUser);
router.delete("/delete-usuarios/:id", [md_auth.ensureAuth], deleteUsuario);

module.exports = router;
