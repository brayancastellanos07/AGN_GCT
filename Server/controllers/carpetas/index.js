const getmethods = require("../carpetas/carp-get.controller.js");
const postCarp = require("../carpetas/carp-post.controller.js");
const updateCarp = require("../carpetas/carp-update.controller.js");
const deleteCarp = require("../carpetas/carp-delete.controller.js");

module.exports ={
    ...getmethods,
    ...postCarp,
    ...updateCarp,
    ...deleteCarp
}