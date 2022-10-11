import React, { useState, useEffect } from "react";
import { Row, Col, Spin, notification } from "antd";
import { getConcepbyCarpByNameApi } from "../../../api/conceptos";
import { getAccessToken } from "../../../api/auth";
import ListConceptos from "../../../components/Web/Conceptos/ListConcep";
import { useParams } from "react-router-dom";


export default function ConcepList() {
  const { nombre } = useParams();
  const token = getAccessToken();
  const [data, setData] = useState(null);
  useEffect(() => {
    getConcepbyCarpByNameApi(token, nombre)
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
  }, [token, nombre]);

  return (
    <Row className="Row">
      <Col md={4} />
      <Col md={24}>
        {!data ? (
          <Spin
            tip="Cargando Conceptos"
            style={{ textAling: "center",  width: "100%", padding: "20%" }}
          />
        ) : (
          <ListConceptos data={data} />
        )}
      </Col>
      <Col md={4} />
    </Row>
  );
}
