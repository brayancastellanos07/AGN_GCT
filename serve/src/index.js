import app from './app.js';
import {sequelize} from  './database/database.js';

async function main(){
    try{
    await sequelize.authenticate();
    console.log("Se ha conectado a la base de datos");
    app.listen(4000);
    console.log("server en 4000")
    }catch(error){
        console.error("No se ha conectado", error);
    }
}
main();
