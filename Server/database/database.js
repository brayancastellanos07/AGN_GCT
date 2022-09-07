const { Sequelize } = require('sequelize');
const { db } = require('../config');


const sequelize = new Sequelize('postgres://AGN:agn123@127.0.0.1:5433/AGNGCT');

module.exports = sequelize;

