import React, { useState, useEffect } from "react";
import { Row, Col, Spin, notification } from "antd";
import { getCarpetasHomeApi } from "../../../api/carpetas";
import CarpetasList from "../../../components/Web/Carpetas";
export default function Conceptos() {
  const [data, setData] = useState(null);
  useEffect(() => {
    getCarpetasHomeApi()
      .then((response) => {
        if (!response.data) {
          notification["warning"]({
            message: response.message,
          });
        } else {
          setData(response.data);
        }
      })
      .catch(() => {
        notification["error"]({
          message: "Error del servidor intentelo mas tarde.",
        });
      });
  }, []);

  return (
    <Row>
      <Col md={4} />
      <Col md={24}>
        {!data ? (
          <Spin
            tip="Cargando Carpetas"
            style={{ textAling: "center", with: "100%", padding: "20px" }}
          />
        ) : (
          <CarpetasList data={data} />
        )}
      </Col>
      <Col md={4} />
    </Row>
  );
}
