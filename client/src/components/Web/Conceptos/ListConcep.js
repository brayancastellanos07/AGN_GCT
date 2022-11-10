import React from "react";
import { Row, Col, Card, Button, BackTop, Popover } from "antd";
import "./ListConcep.scss";
import imagen from "../../../assets/img/png/pdf_1.jpg";
import { useParams } from "react-router-dom";
import {
  FullscreenOutlined,
  ArrowDownOutlined,
  UpCircleOutlined,
} from "@ant-design/icons";
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
    dowLoadPdf(data.archivo).then((response) => {
      var fileUrl = window.URL.createObjectURL(response, {
        type: "application/pdf",
      });
      var a = document.createElement("a");
      a.setAttribute("download", data.nombre);
      a.setAttribute("href", fileUrl);
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });
  };
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
      <BackTop>
        <div className="Up">
          <UpCircleOutlined />
        </div>
      </BackTop>
    </div>
  );

  function Conceptos(props) {
    const { data, previewPdfDocument, dowloadPdf } = props;
    const { Meta } = Card;

    const content = {
      botonPrevisualizar: "Previsualizar Concepto",
      ContenidoBotonPrevisualizar:
        "Permite ver el concepto en una ventana nueva",

      botonDescargar: "Descargar Concepto",
      ContenidoBotonDescargar: "Permite descargar una copia del concepto",
    };

    return (
      <Card
        className="home-conceptos__card"
        cover={<img src={imagen} alt="Conceptos"></img>}
        actions={[
          <Popover
            content={content.ContenidoBotonPrevisualizar}
            title={content.botonPrevisualizar}
          >
            <Button type="default" onClick={() => previewPdfDocument(data)}>
              <FullscreenOutlined />
            </Button>
          </Popover>,
          <Popover
            content={content.ContenidoBotonDescargar}
            title={content.botonDescargar}
          >
            <Button type="dashed" onClick={() => dowloadPdf(data)}>
              <ArrowDownOutlined />
            </Button>
          </Popover>,
        ]}
      >
        <Meta title={`${data.nombre}`} description={`${data.descripcion}`} />
      </Card>
    );
  }
}
