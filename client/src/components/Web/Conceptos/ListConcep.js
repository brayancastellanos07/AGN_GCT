import React from "react";
import { Row, Col, Card, Button,} from "antd";
import "./ListConcep.scss";
import imagen from "../../../assets/img/png/pdf_1.jpg";
import { useParams } from "react-router-dom";

export default function ListConceptos(props) {
 const {data} = props
 const { nombre } = useParams();
  return (
    <div className="conceptos-list">
      <Row className="Row">
        <Col lg={24} className="Row__Col">
          <h2>{`Listado de conceptos del año ${nombre}`} </h2>
        </Col>
        <Row className="Row__row-conceptos">
        {data.map((data) => (
          <Col key={data.id_concepto} md={6}>
            <Conceptos  imagen={imagen}data={data} />
          </Col>
        ))}
        </Row>
      </Row>
    </div>
  );

  function Conceptos(props){
    const {data} = props;
    const {Meta} = Card;
   
    return(
      <Card
      className="home-conceptos__card"
      cover={<img src={imagen} alt="Conceptos"></img>}
      actions={[
        //<Link to={`list-conceptos/${data.nombre}`}>
        <Button>
        
          Ingresar
        </Button>,
       // </Link>
      ]}
    >
      <Meta title={`${data.nombre}`} description={`${data.descripcion}`} />
    </Card>
    );
  }
}

