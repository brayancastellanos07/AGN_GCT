const {Sequelize}  = require('Sequelize');
const  {db}  = require('../config');

// const sequelize =  new Sequelize(`${db.database}`,`${db.user}`,`${db.password}`,{
//      host: "localhost",
//      dialect:"postgres"
 
// }); 

const ConnectionDB = new Sequelize('postgres://AGN:agn123@127.0.0.1:5432/AGNGCT');
ConnectionDB.sync()
module.exports = ConnectionDB;
