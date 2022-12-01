import React, { useState } from "react";
import avatar from "../../../../assets/img/jpg/background_login_1.jpeg";
import {
  Button,
  Row,
  Col,
  Card,
  BackTop,
  Input,
  List,
  Popover,
  Modal as ModalAntd,
  notification,
} from "antd";
import Modal from "../../../modal/Modal";
import {
  ArrowDownOutlined,
  FullscreenOutlined,
  LoginOutlined,
  UpCircleOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import "./ListConcep.scss";
import { getAccessToken } from "../../../../api/auth";
import { Link } from "react-router-dom";
import * as dayjs from "dayjs";
import {
  deleteConceptApi,
  getPdfApi,
  dowLoadPdf,
  getConceptoSearch,
} from "../../../../api/conceptos";
import EditConceptForm from "../../Conceptos/EditConceptForm";
const { confirm } = ModalAntd;
const { Search } = Input;
export default function ListConceptos(props) {
  const { data, setReloadConceptos } = props;
  const [viewConcept, setviewConcept] = useState(false);
  const [findConcept, setfindConcept] = useState({});
  const [searchConcept, setsearchConcept] = useState({});
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  const showDeleteConfirmConcept = (data) => {
    const accesToken = getAccessToken();
    confirm({
      title: "Eliminar Concepto",
      content: `¿Esta seguro de Eliminar el concepto ${data.nombre}`,
      okText: "Eliminar",
      okType: "danger",
      cancelText: "Cancelar",
      onOk() {
        deleteConceptApi(accesToken, data.id_concepto)
          .then((response) => {
            notification["success"]({
              message: response,
            });
            //setReloadConceptos(true);
            setfindConcept({});
            setviewConcept(false);
          })
          .catch((err) => {
            notification["error"]({
              message: err.message,
            });
          });
      },
    });
  };

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

  const content = {
    botonActualizar: "Boton Actualizar",
    ContenidoBotonActualizar:
      "Permite actualizar la infromación  y el avatar del usuario ",

    botonEliminar: "Boton Eliminar",
    ContenidoBotonEliminar: "Permite Eliminar un registro",

    botonPrevisualizar: "Previsualizar Concepto",
    ContenidoBotonPrevisualizar: "Permite ver el concepto en una ventana nueva",

    botonDescargar: "Descargar Concepto",
    ContenidoBotonDescargar: "Permite descargar una copia del concepto",
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

  const EditConceptos = (data) => {
    console.log(data)
    setIsVisibleModal(true);
    setModalTitle(`Editar el concepto: ${data.nombre}`);
    setModalContent(
      <EditConceptForm
        data={data}
        setIsVisibleModal={setIsVisibleModal}
        setReloadConceptos={setReloadConceptos}
      />
    );
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
                <CardCarpetas imagen={avatar} data={data} />
              </Col>
            ))}
          </Row>
        ) : (
          <Col span={24}>
            <ListFindConcept
              findConcept={findConcept}
              showDeleteConfirmConcept={showDeleteConfirmConcept}
              EditConceptos={EditConceptos}
              previewPdfDocument={previewPdfDocument}
              dowloadPdf={dowloadPdf}
              content={content}
            />
          </Col>
        )}
      </Row>
      <BackTop>
        <div className="Up">
          <UpCircleOutlined />
        </div>
      </BackTop>
      ,
      <Modal
        title={modalTitle}
        isVisible={isVisibleModal}
        setIsVisible={setIsVisibleModal}
      >
        {modalContent}
      </Modal>
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

function ListFindConcept(props) {
  const {
    findConcept,
    showDeleteConfirmConcept,
    EditConceptos,
    previewPdfDocument,
    dowloadPdf,
    content,
  } = props;

  return (
    <List
      className="conceptos"
      itemLayout="vertical"
      dataSource={findConcept}
      renderItem={(data) => (
        <FindConcept
          data={data}
          showDeleteConfirmConcept={showDeleteConfirmConcept}
          EditConceptos={EditConceptos}
          previewPdfDocument={previewPdfDocument}
          dowloadPdf={dowloadPdf}
          content={content}
        />
      )}
    />
  );
}

function FindConcept(props) {
  const {
    data,
    showDeleteConfirmConcept,
    EditConceptos,
    previewPdfDocument,
    dowloadPdf,
    content,
  } = props;
  return (
    <List.Item
      actions={[
        <Popover
          content={content.ContenidoBotonActualizar}
          title={content.botonActualizar}
          placement="rightBottom"
        >
          <Button type="primary" onClick={() => EditConceptos(data)}>
            <EditOutlined />
          </Button>
        </Popover>,

        <Popover
          content={content.ContenidoBotonEliminar}
          title={content.botonEliminar}
        >
          <Button type="danger" onClick={() => showDeleteConfirmConcept(data)}>
            <DeleteOutlined />
          </Button>
        </Popover>,
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
      <List.Item.Meta
        title={`Concepto: ${data.nombre}`}
        description={`
     
     Carpeta: ${data.carpeta},
    
     Archivo:  ${data.archivo},

     Fecha: ${dayjs(data.fecha).format("YYYY/MM/DD")}
     
     `}
      />
      Descripción: {data.descripcion}
    </List.Item>
  );
}
