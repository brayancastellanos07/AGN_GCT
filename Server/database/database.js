const { Sequelize } = require('sequelize');
const { db } = require('../config');


const sequelize = new Sequelize('postgres://AGN:agn123@127.0.0.1:5432/AGNGCT',{
    pool:{
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

module.exports = sequelize;

