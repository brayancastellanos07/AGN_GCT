import React from "react";
import {Layout, Row, Col} from "antd";
import MyInfo from "./Myinfo/MyInfo";
import Contactenos from "./Contactenos/Contactenos";
import "./Footer.scss";

export default function Footer(){
    const {Footer} = Layout;

    return(
        <Footer className="footer">
            <Row>
                <Col md={4}/>
                <Col md={24}> 
                    <Row>
                        <Col md={12} className="footer__MyInfo">
                            <MyInfo/>
                        </Col>
                        <Col md={12} className="footer__Contactenos">
                            <Contactenos/>
                        </Col>
                    </Row>
                    <Row className="footer__copyright">
                        <Col md={12}>
                           <span className="footer__copyright__span" >@ 2022 derechos reservados</span>  
                        </Col>
                        <Col md={12}>
                            <span className="footer__copyright__span">Archivo General de la Nacion</span> 
                        </Col>
                    </Row>
                </Col>
                <Col md={4}/>
            </Row>

        </Footer>

    );
} 