const app = require("./app.js");
const sequelize = require("./database/database");
const { db } = require("./config");

async function main() {
  sequelize
    .authenticate()
    .then(() => {
      console.log("Conectado");
      app.listen(db.portApi);
      
    })
    .catch((err) => {
      console.log("No se conecto");
    });
}
main();
