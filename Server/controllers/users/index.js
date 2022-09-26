const getmethods = require("../users/user-get.controller.js");
const postmethods = require("../users/user-post.controller.js");
const deleteUsuario =  require("../users/user-delete.controller.js");
const updatemethods =  require("../users/user-update.controller");

module.exports = {
    ...getmethods,
    ...postmethods,
    ...deleteUsuario,
    ...updatemethods,
}