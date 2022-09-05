const express = require("express");
const app = express();
const morgan = require ("morgan");

// load routings

const rolRoutes = require('./routers/routerRol.js');
const docRoutes = require('./routers/routerDoc.js'); 

app.use(morgan("dev"));
app.use(express.json())
//configuración header http 


//Routers basic 


app.use("/api",rolRoutes);
app.use("/api",docRoutes);
module.exports =  app;