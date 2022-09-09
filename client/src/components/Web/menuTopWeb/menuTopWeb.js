import React from "react";
import "./menuTopWeb.scss";
import imagen from "../../../assets/img/png/logoagninicio.png";

export default function menutopWeb() {
  return (
    <div className="menu-top">
      <div className="menu-top__left">
        <img
          className="menu-top__left-logo1"
          src={imagen}
          alt="Archivo General De La Nación"
        />
      </div>
      <div className="menu-top__right"></div>
    </div>
  );
}
