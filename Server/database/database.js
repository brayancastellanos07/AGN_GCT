const { Sequelize } = require('sequelize');
const { db } = require('../config');

// const sequelize = new Sequelize('AGNGCT', 'AGN', 'agn123', {
//      host: 'localhost',
//      dialect: 'postgres'
//    });

// const sequelize =  new Sequelize(`${db.database}`,`${db.user}`,`${db.password}`,{
//      host: "localhost",
//      dialect:"postgres"
 
// });

const sequelize = new Sequelize('postgres://AGN:agn123@localhost:5433/AGNGCT');
//sequelize.sync()
module.exports = sequelize;
