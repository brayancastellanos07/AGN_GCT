import React from "react";
import { Row, Col, Card, Button } from "antd";
import "./listCarpetas.scss";
import imagen from "../../../assets/img/jpg/background_login_1.jpeg";
import { LoginOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

export default function CarpetasList(props) {
  const { data } = props;

  return (
    <div className="carpetas-list">
      <Row className="Row">
        <Col lg={24} className="Row__Col">
          <h2>Listado de Años </h2>
        </Col>
        <Row className="Row__row-courses">
          {data.map((data) => (
            <Col key={data.id_carpeta} md={6}>
              <Carpetas imagen={imagen} data={data} />
            </Col>
          ))}
        </Row>
      </Row>
    </div>
  );
}

function Carpetas(props) {
  const { data, imagen } = props;
  const { Meta } = Card;

  return (
    <Card
      className="home-carpetas__card"
      cover={<img src={imagen} alt="Carpetas"></img>}
      actions={[
        <Link to={`list-conceptos/${data.nombre}`}>
          <Button>
            <LoginOutlined />
            Ingresar
          </Button>
          ,
        </Link>,
      ]}
    >
      <Meta title={`${data.nombre}`} description={`${data.descripcion}`} />
    </Card>
  );
}
