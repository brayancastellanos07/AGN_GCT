const app =  require ("./app.js");
const sequelize = require  ('./database/database');
const  {db}  = require('./config');


async function main() {
  await sequelize.sync({force: false});
  app.listen(db.port);
  console.log("#################################");
  console.log("############ API REST ###########");
  console.log("#################################"); 
  console.log(`http://${db.host}:${db.port}`);
  console.log(`Server on port ${db.port}`);
}

main();