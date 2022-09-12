import React from "react";
import {Menu} from "antd";
import imagen from "../../../assets/img/png/logoagninicio.png";
import {Link} from "react-router-dom";
import "./menuTopWeb.scss";



export default function menutopWeb() {
  return (
    <Menu className="menu-top" mode="horizontal">
      <Menu.Item key={"logo"} className="menu-top__logo">
         <Link to={"/"}>
          <img src={imagen} alt="Archivo General de la Nación"/>
         </Link>
      </Menu.Item>
      <div>redes</div>
    </Menu>
    
  );
}
