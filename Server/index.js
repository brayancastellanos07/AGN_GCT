const app =  require ("./app.js");
const sequelize = require  ('./database/database');
const  {db}  = require('./config');



async function main() {

await sequelize.sync({force: false});
 /*
  app.listen(db.port);
  console.log("#################################");
  console.log("############ API REST ###########");
  console.log("#################################"); 
  console.log(`http://${db.host}:${db.port}`);
  console.log(`Server on port ${db.port}`);
  console.log(db.password);

*/

sequelize.authenticate()
  .then(() => {
    console.log('Conectado')
    app.listen(db.portApi);
    console.log(db.portApi)
  })
  .catch(err => {
    console.log('No se conecto')
  })

/*

try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
  app.listen(db.port);
} catch (error) {
  console.error('Unable to connect to the database:', error);
}
*/

}
main();