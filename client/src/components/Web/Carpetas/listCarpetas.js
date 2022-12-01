import React, { useState } from "react";
import {
  Popover,
  Row,
  Col,
  Card,
  Button,
  BackTop,
  Input,
  notification,
} from "antd";
import "./listCarpetas.scss";
import imagen from "../../../assets/img/jpg/background_login_1.jpeg";
import {
  ArrowDownOutlined,
  FullscreenOutlined,
  LoginOutlined,
  UpCircleOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import {
  getPdfApi,
  dowLoadPdf,
  getConceptoSearch,
} from "../../../api/conceptos";

const { Search } = Input;
export default function CarpetasList(props) {
  const { data } = props;
  const [findConcept, setfindConcept] = useState({});
  const [viewConcept, setviewConcept] = useState(false);
  const [searchConcept, setsearchConcept] = useState({});


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

  const searchConceptos = (searchConcept) => {
    if (searchConcept) {
      getConceptoSearch(searchConcept)
        .then((response) => {
          if (response.data.length) {
            notification["success"]({
              message: "Se encontraron coincidencias. ",
            });
            setfindConcept(response.data);
            setviewConcept(true);
          }else{
            notification["error"]({
              message: `No se encontraron coincidencias para: ${searchConcept}`,
            });
            setfindConcept(response.data);
            setviewConcept(true);
          }
          })
        .catch((err) => {
          notification["error"]({
            message: err.message,
          });
          setfindConcept({});
          setviewConcept(false);
        });
    } else {
      setfindConcept({});
      setviewConcept(false);
    }
  };

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
            onSearch={searchConceptos}
            onChange={(e) =>
              setsearchConcept({ ...searchConcept, dato: e.target.value })
            }
          />
        </Col>
        {!viewConcept ? (
          <Row className="Row__row-courses">
            {data.map((data) => (
              <Col key={data.id_carpeta} md={6}>
                <Carpetas imagen={imagen} data={data} />
              </Col>
            ))}
          </Row>
        ) : (
          <Row className="Row__row-conceptos">
            {findConcept.map((data) => (
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
        )}
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

function Conceptos(props) {
  const { data, previewPdfDocument, dowloadPdf } = props;
  const { Meta } = Card;

  const content = {
    botonPrevisualizar: "Previsualizar Concepto",
    ContenidoBotonPrevisualizar: "Permite ver el concepto en una ventana nueva",

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
