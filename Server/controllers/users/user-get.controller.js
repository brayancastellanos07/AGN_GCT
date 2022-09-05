const bcrypt = require("bcrypt-nodejs");

const User = require("../../models/user.js");

function signUp(req, res) {
  try {
    const user = new User();
    const { email, password, repeatPassword } = req.body;

    user.email = email;
    user.role = "admin",
    user.active = false;

    if (!password || !repeatPassword) {
      res.status(404).send({ message: "Las contraseñas deben coincidir" });
    } else {
      console.log("Continuar");
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

module.exports = { signUp };
