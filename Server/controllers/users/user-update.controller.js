const Usuario =  require("../../models/user.js");
const colors = require("colors");
const { Model } = require("sequelize/types");

async function updateUser(req,res){
    const {id} =  req.params;
}

module.exports = {updateUser}