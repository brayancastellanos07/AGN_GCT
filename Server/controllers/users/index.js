const getmethods = require("../users/user-get.controller.js");
const postmethods = require("../users/user-post.controller.js");
const deleteUsuario =  require("../users/user-delete.controller.js");

module.exports = {
    ...getmethods,
    ...postmethods,
    ...deleteUsuario,
}