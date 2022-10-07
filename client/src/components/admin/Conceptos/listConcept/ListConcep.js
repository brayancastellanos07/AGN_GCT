import React, { useState } from "react";
import avatar from "../../../../assets/img/jpg/background_login_1.jpeg";
import { Button, Modal, Row, Col, Card } from "antd";
import { HighlightOutlined } from "@ant-design/icons";
import "./ListConcep.scss";

export default function ListConceptos(props) {
  return (
    <div className="list-conceptos">
      <div className="list-carpetas__header">
        <h2>Conceptos Tecnicos</h2>
        <Button
          type="primary"
          icon={<HighlightOutlined />}
          onClick={() => console.log("Hola")}
        >
          Nuevo Concepto
        </Button>
      </div>
      <Row className="Row">
        <Col lg={24} className="Row__Col">
          <h2>Listado de Años </h2>
        </Col>
        <Col lg={4} />
        <Col lg={24}>
          <Row className="Row__row-courses">
            <Col md={6}>
              <CardCarpetas imagen={avatar} />
            </Col>
            <Col md={6}>
              <CardCarpetas imagen={avatar} />
            </Col>
            <Col md={6}>
              <CardCarpetas imagen={avatar} />
            </Col>
            <Col md={6}>
              <CardCarpetas imagen={avatar} />
            </Col>
          </Row>
        </Col>
        <Col lg={4} />
      </Row>
      <Modal
        title={"modalTitle"}
        isVisible={"isVisibleModal"}
        setIsVisible={"setIsVisibleModal"}
      >
        {"modalContent"}
      </Modal>
    </div>
  );
}

function CardCarpetas(props) {
  const { imagen, nombre, descripcion } = props;
  const { Meta } = Card;

  return (
    <Card
      className="home-carpetas__card"
      cover={<img src={imagen} alt="2013"></img>}
      actions={[<Button>Ingresar</Button>]}
    >
      <Meta title="2013" description="Conceptos generados en el año 2013" />
    </Card>
  );
}
