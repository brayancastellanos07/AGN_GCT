import React from "react";
import {Layout, Row, Col} from "antd";
import MyInfo from "./Myinfo/MyInfo";
import "./Footer.scss";

export default function Footer(){
    const {Footer} = Layout;

    return(
        <Footer className="footer">
            <Row>
                <Col md={4}/>
                <Col md={16}>
                    <Row>
                        <Col md={12}>
                            <MyInfo/>
                        </Col>
                        <Col md={12}>
                            Newsleter
                        </Col>
                    </Row>
                    <Row className="footer__copyright">
                        <Col md={12}>
                            @ 2022 derechos reservados 
                        </Col>
                        <Col md={12}>
                            Archivo General de la Nacion 
                        </Col>
                    </Row>
                </Col>
                <Col md={4}/>
            </Row>

        </Footer>

    );
}