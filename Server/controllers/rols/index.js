const getRols =  require("../rols/rol-get.controller.js");
const dataUpdate =  require("../rols/rol-update.controller.js");

module.exports = {
    ...getRols,
    ...dataUpdate
};