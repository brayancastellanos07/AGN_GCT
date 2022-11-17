import React from "react";
import avatar from "../../../../assets/img/jpg/background_login_1.jpeg";
import { Button, Row, Col, Card, BackTop, Input } from "antd";
import { LoginOutlined, UpCircleOutlined } from "@ant-design/icons";
import "./ListConcep.scss";
import { Link } from "react-router-dom";

const { Search } = Input;
export default function ListConceptos(props) {
  const { data } = props;
  return (
    <div className="carpetas-list">
      <Row className="Row">
        <Col lg={8} className="Row__Col" />
        <Col lg={8} className="Row__Col">
          <h2>Listado de Años </h2>
        </Col>
        <Col lg={8} className="Row__Col">
          <Search
            placeholder="Buscar conceptos por palabras clave"
            allowClear
          />
        </Col>

        <Row className="Row__row-courses">
          {data.map((data) => (
            <Col key={data.id_carpeta} md={6}>
              <CardCarpetas imagen={avatar} data={data} />
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

function CardCarpetas(props) {
  const { imagen, data } = props;
  const { Meta } = Card;

  return (
    <Card
      className="home-carpetas__card"
      cover={<img src={imagen} alt="Carpetas"></img>}
      actions={[
        <Link to={`/admin/list-conceptos/${data.nombre}`}>
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
