import React,{useState, useEffect} from "react";
import { Row, Col, Spin, notification } from "antd";
import {getCarpetasApi} from"../../../api/carpetas";
import { getAccessToken } from "../../../api/auth";
import ListConceptos from"../../../components/admin/Carpetas/listCarpConcept"
export default function CarpConceptosAdmin(){
    const [data, setData] = useState(null);
    const accesToken = getAccessToken();

    useEffect(() => {
        getCarpetasApi(accesToken)
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
      }, [accesToken]);
    return(
        <Row>
      <Col md={4} />
      <Col md={24}>
        {!data ? (
          <Spin
            tip="Cargando Carpetas"
            style={{ textAling: "center", width: "100%", padding: "20%" }}
          />
        ) : (
          < ListConceptos data={data} />
        )}
      </Col>
      <Col md={4} />
    </Row>
    )
}