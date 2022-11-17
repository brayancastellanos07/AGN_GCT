import React from "react";

import "./Contactenos.scss";

export default function Contactenos() {
  return (
    <div className="contactenos">
      <h1><span>CONTÁCTENOS</span></h1>
      <hr />
      <h4> 
        Horario de atención de lunes a viernes de 8:00 a.m. a 5:00 p.m. Consulta
        de Protocolos Notariales de lunes a viernes de 8:00 a.m. a 1:00 p.m.
      </h4>
      <ul>
        <li>Carrera 6 No. 6 – 91 Bogotá D.C.</li>
        <li>Teléfono: (60) 1 328 2888</li>
        <li>Línea de atención al ciudadano: (60) 1 328 2888 ext. 870</li>
        <li>Código postal 111711-111711345</li>
        <li>
          <a href="mailto:contacto@archivogeneral.gov.co">
            {" "}
           <span>contacto@archivogeneral.gov.co</span> 
          </a>
        </li>
        <li>
          <a href="mailto:notificacionesjudiciales@archivogeneral.gov.co">
            {" "}
            <span>notificacionesjudiciales@archivogeneral.gov.co</span>
          </a>
        </li>
        <li>
          <a href="https://www.archivogeneral.gov.co/sites/default/files/Estructura_Web/1_Conozcanos/NotificacionesControlDisciplinarioInterno/ESTADO_023-2017%20.pdf" target="_blank">
            {" "}
            <span>NOTIFICACIONES CONTROL DISCIPLINARIO INTERNO</span>
          </a>
        </li>
        <li>
          <a href="https://www.archivogeneral.gov.co/Transparencia/mecanismos-contacto/Localizacion-fisica" target="_blank">
            {" "}
           <span>Sedes AGN</span> 
          </a>
        </li>
      </ul>
    </div>
  );
}
