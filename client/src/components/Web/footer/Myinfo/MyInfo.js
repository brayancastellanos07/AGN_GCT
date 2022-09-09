import React from "react";
import LogoWhite from "../../../../assets/img/png/logo_blanco.png";

import "./MyInfo.scss";

export default function MyInfo() {
  return (
    <div className="my-info">
      <h1>CONÓZCANOS</h1>
      <hr/>
      <img src={LogoWhite} alt="Archivo General de la Nacion" />
      <h4>
        El Archivo General de la Nación, es una entidad del orden nacional
        adscrita al Ministerio de Cultura, encargada de la organización y
        dirección del Sistema Nacional de Archivos – SNA, de regir la política
        archivística en Colombia y de custodiar, resguardar y proteger el
        patrimonio documental del país y ponerlo al servicio de la comunidad.
      </h4>
    </div>
  );
}
