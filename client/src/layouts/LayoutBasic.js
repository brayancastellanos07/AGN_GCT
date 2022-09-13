import React from "react";
import { Row, Col } from "antd";
import MenuTopWeb from "../components/Web/menuTopWeb";
//import Footer from "../components/Web/footer/Footer";
import "./LayoutBasic.scss";

export default function LayoutBasic(props) {
  return (
    <Row>
        <Col lg={4}/>
        <Col lg={16}>
            <MenuTopWeb/>
            <p>contenido</p>
            <p>Footer..</p>
        </Col>
        <Col lg={4}/>
    </Row>
  );
}
