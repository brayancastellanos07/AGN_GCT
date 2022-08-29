const express = require("express");
const app = express();
const morgan = require ("morgan");

// load routings
const userRoutes =  require('./routers/user.js'); 

app.use(morgan("dev"));
app.use(express.json())
//configuración header http 


//Routers basic 


app.use("/api",userRoutes);
module.exports =  app;