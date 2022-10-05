const postConceptos =  require("../conceptos/conceptos-post.controllers.js");
const getMethos =  require("../conceptos/conceptos-get.controller.js");
const updateAvatar =  require("../conceptos/conceptos-update.controllers.js");
const deleteConceptos = require("../conceptos/conceptos-delete.controller.js");
module.exports = {
    ...getMethos,
    ...postConceptos,
    ...updateAvatar,
    ...deleteConceptos,
}