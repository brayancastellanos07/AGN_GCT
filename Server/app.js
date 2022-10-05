const express = require("express");
const app = express();
// const cors =  require("cors");
const morgan = require ("morgan");

// load routings
const authRoutes =  require("./routers/auth.js");
const rolRoutes = require('./routers/routerRol.js');
const docRoutes = require('./routers/routerDoc.js'); 
const carpRoutes =  require('./routers/routerCarp.js');
const userRouters = require('./routers/routerUser.js');
const conceptos = require('./routers/routerConcep.js');



// app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(express.json());


//configuración header http 
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
    );
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
    next();
  });


//Routers basic 


app.use("/api",rolRoutes);
app.use("/api",docRoutes);
app.use("/api",carpRoutes);
app.use("/api",userRouters);
app.use("/api",authRoutes);
app.use("/api",conceptos);

module.exports =  app;