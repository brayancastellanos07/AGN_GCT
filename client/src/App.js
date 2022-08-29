import { BrowserRouter, Routes, Route } from 'react-router-dom';
import routes from "./config/routes";
import React from 'react';
import "./app.scss";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      {routes.map((route, index )=>(
        <Route
         key={index}
         path={route.path}
         element = {
         <route.layout>
            <route.component/>
         </route.layout>
         }
        />
      ))}
    </Routes>
    </BrowserRouter>
  );
}
export default App;
