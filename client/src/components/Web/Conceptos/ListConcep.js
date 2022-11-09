import React from "react";
import { Row, Col, Card, Button } from "antd";
import "./ListConcep.scss";
import imagen from "../../../assets/img/png/pdf_1.jpg";
import { useParams } from "react-router-dom";
import { FullscreenOutlined, ArrowDownOutlined } from "@ant-design/icons";
import { getPdfApi, dowLoadPdf } from "../../../api/conceptos";

export default function ListConceptos(props) {
  const { data } = props;
  const { nombre } = useParams();

  const previewPdfDocument = (data) => {
    getPdfApi(data.archivo).then((response) => {
      const fileUrl = response;
      let alink = document.createElement("a");
      alink.href = fileUrl;
      alink.target = "_blank";
      alink.title = data.nombre;
      alink.click();
      alink.download = data.nombre;
    });
  };

  const dowloadPdf = (data) => {
    dowLoadPdf(data.archivo)
    .then((response) => {
      var fileUrl =  window.URL.createObjectURL( response,{type: "application/pdf"});
      var a = document.createElement("a");
      a.setAttribute("download", data.nombre);
      a.setAttribute("href", fileUrl);
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });
  }
  return (
    <div className="conceptos-list">
      <Row className="Row">
        <Col lg={24} className="Row__Col">
          <h2>{`Listado de conceptos del año ${nombre}`} </h2>
        </Col>
        <Row className="Row__row-conceptos">
          {data.map((data) => (
            <Col key={data.id_concepto} md={6}>
              <Conceptos 
              imagen={imagen} 
              data={data} 
              previewPdfDocument={previewPdfDocument}
              dowloadPdf={dowloadPdf} 
             
              
              />
            </Col>
          ))}
        </Row>
      </Row>
    </div>
  );

  function Conceptos(props) {
    const { data,previewPdfDocument, dowloadPdf } = props;
    const { Meta } = Card;

    return (
      <Card
        className="home-conceptos__card"
        cover={<img src={imagen} alt="Conceptos"></img>}
        
        actions={[
         
          <Button type="default" onClick={() => previewPdfDocument(data)}>
            <FullscreenOutlined /> Previsualizar
          </Button>,
          <Button type="dashed" onClick={() => dowloadPdf(data)}>
            <ArrowDownOutlined /> Descargar
          </Button>,
      
        ]}
      >
        <Meta title={`${data.nombre}`} description={`${data.descripcion}`} />
      </Card>
    );
  }
}
