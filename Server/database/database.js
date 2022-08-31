const {Sequelize}  = require('Sequelize');
const  {db}  = require('../config');

const sequelize =  new Sequelize(`${db.database}`,`${db.user}`,`${db.password}`,{
     host: "localhost",
     dialect:"postgres"
 
}); 

// const sequelize = new Sequelize('postgres://AGN:agn123@localhost:3500/AGNGCT');
sequelize.sync()
module.exports = sequelize;
