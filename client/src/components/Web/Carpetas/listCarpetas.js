import React from "react";
import { Row, Col, Card, Button, BackTop, Input } from "antd";
import "./listCarpetas.scss";
import imagen from "../../../assets/img/jpg/background_login_1.jpeg";
import { LoginOutlined, UpCircleOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Search } = Input;
export default function CarpetasList(props) {
  const { data } = props;

  return (
    <div className="carpetas-list">
      <Row className="Row">
        <Col lg={8} className="Row__Col">
          <h2>Listado de Años </h2>
        </Col>
        <Col lg={8} className="Row__Col"></Col>
        <Col lg={8} className="Row__right">
          <Search
            placeholder="Buscar conceptos por palabras clave"
            //style={{ width: 400 }}
            allowClear
          />
        </Col>
        <Row className="Row__row-courses">
          {data.map((data) => (
            <Col key={data.id_carpeta} md={6}>
              <Carpetas imagen={imagen} data={data} />
            </Col>
          ))}
        </Row>
      </Row>
      <BackTop>
        <div className="Up">
          <UpCircleOutlined />
        </div>
      </BackTop>
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
