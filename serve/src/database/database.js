
const {Sequelize}  = require('Sequelize');
const  {dbConfig}  = require('../config');

const {user, password, database, host, dialect, port } = dbConfig

// const sequelize = new Sequelize(`${dialect}://${user}:${password}@localhost:${port}/${database}`,{
//     logging: msg => console.log(msg),
// })

const sequelize = new Sequelize("AGNGCT", "AGN", "agn123", {
      host: "localhost",
     dialect: "postgres"
    });
    module.exports = sequelize;

import Sequelize from "sequelize";
import {dbConfig}  from "../config.js";

const {user, password, database, host, dialect, port } = dbConfig

export const sequelize = new Sequelize(`${dialect}://${user}:${password}@localhost:${port}/${database}`,{
    logging: msg => console.log(msg),
})

//  export const sequelize = new Sequelize("AGNGCT", "AGN", "agn123", {
//   host: "localhost",
//   dialect: "postgres"
// }
// ); 




