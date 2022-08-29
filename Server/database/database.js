const Sequelize = require('sequelize');
const  {db}  = require('../config');

const sequelize =  new Sequelize(db.database,db.user,db.password,{
    host: "localhost",
    dialect:"postgres"
 
}); 

module.exports = sequelize;