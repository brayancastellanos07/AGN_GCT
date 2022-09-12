import React from "react";

import "./Contactenos.scss";

export default function Contactenos() {
  return (
    <div className="contactenos">
      <h1>CONTÁCTENOS</h1>
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
            contacto@archivogeneral.gov.co
          </a>
        </li>
        <li>
          <a href="mailto:notificacionesjudiciales@archivogeneral.gov.co">
            {" "}
            notificacionesjudiciales@archivogeneral.gov.co
          </a>
        </li>
        <li>
          <a href="https://www.archivogeneral.gov.co/sites/default/files/Estructura_Web/1_Conozcanos/NotificacionesControlDisciplinarioInterno/ESTADO_023-2017%20.pdf">
            {" "}
            NOTIFICACIONES CONTROL DISCIPLINARIO INTERNO
          </a>
        </li>
        <li>
          <a href="https://www.archivogeneral.gov.co/Transparencia/mecanismos-contacto/Localizacion-fisica">
            {" "}
            Sedes AGN
          </a>
        </li>
      </ul>
    </div>
  );
}
