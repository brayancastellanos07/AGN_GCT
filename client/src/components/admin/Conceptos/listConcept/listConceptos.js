import {
  List,
  Popover,
  Button,
  Modal as ModalAntd,
  notification,
  Input,
  BackTop,
  Col,
  Row
} from "antd";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Modal from "../../../modal/Modal";
import * as dayjs from "dayjs";
import AddConcepForm from "../AddConcepForm/AddConcepForm";
import { getAccessToken } from "../../../../api/auth";
import {
  EditOutlined,
  DeleteOutlined,
  FolderAddOutlined,
  FullscreenOutlined,
  ArrowDownOutlined,
  UpCircleOutlined,
} from "@ant-design/icons";
import {
  deleteConceptApi,
  getPdfApi,
  dowLoadPdf,
  getConceptoSearch, 
} from "../../../../api/conceptos";
import EditConceptForm from "../EditConceptForm/EditConceptForm";

import "./listConceptos.scss";

const { confirm } = ModalAntd;
const { Search } = Input;

export default function LisConceptos(props) {
  const { listConceptos, setReloadConceptos } = props;
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);
  const { nombre } = useParams();
  const [searchConcept, setsearchConcept] = useState({});
  const [findConcept, setfindConcept] = useState({});
  const [viewConcept, setviewConcept] = useState(false);

  useEffect(() => {
    if (searchConcept === null) {
      setfindConcept({});
      setviewConcept(false);
    }
  },[searchConcept]);

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
            setReloadConceptos(true);
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

  const AddConcepModal = () => {
    setIsVisibleModal(true);
    setModalTitle("Creando nuevo concepto.");
    setModalContent(
      <AddConcepForm
        setIsVisibleModal={setIsVisibleModal}
        setReloadConceptos={setReloadConceptos}
      />
    );
  };
  const EditConceptos = (data) => {
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
          console.log(response.data.length)

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
    <div className="list-conceptos">
      <div className="list-conceptos__header">
      <Row className="list-conceptos__header__Row">
      <Col lg={8} className="Row__Col">
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
        <Col lg={4} className="Row__Col"/>
        <Col lg={4} className="Row__Col">
        <div className="list-conceptos__header__div">
          <h2 className="list-conceptos__header__h2">
            {`Conceptos del año ${nombre}`}
          </h2>
        </div>
        </Col>
       
        <Col lg={4} className="Row__Col"/>
        <Col lg={4} className="Row__Col">
        <Button
          type="primary"
          icon={<FolderAddOutlined />}
          onClick={AddConcepModal}
        >
          Nuevo Concepto
        </Button>
        </Col>
        </Row>
      </div>
      {!viewConcept ? (
        <ListConcep
          listConceptos={listConceptos}
          showDeleteConfirmConcept={showDeleteConfirmConcept}
          EditConceptos={EditConceptos}
          previewPdfDocument={previewPdfDocument}
          dowloadPdf={dowloadPdf}
          content={content}
        />
      ) : (
        <ListFindConcept
          findConcept={findConcept}
          showDeleteConfirmConcept={showDeleteConfirmConcept}
          EditConceptos={EditConceptos}
          previewPdfDocument={previewPdfDocument}
          dowloadPdf={dowloadPdf}
          content={content}
        />
      )}

      <Modal
        title={modalTitle}
        isVisible={isVisibleModal}
        setIsVisible={setIsVisibleModal}
      >
        {modalContent}
      </Modal>
      <BackTop>
        <div className="Up">
          <UpCircleOutlined />
        </div>
      </BackTop>
    </div>
  );
}

function ListConcep(props) {
  const {
    listConceptos,
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
      dataSource={listConceptos}
      renderItem={(data) => (
        <ListConceptosAdmin
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

function ListConceptosAdmin(props) {
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
