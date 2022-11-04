import { List, Popover, Button, Modal as ModalAntd, notification } from "antd";
import React, { useState } from "react";
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
} from "@ant-design/icons";
import {
  deleteConceptApi,
  getPdfApi,
  dowLoadPdf,
} from "../../../../api/conceptos";
import EditConceptForm from "../EditConceptForm/EditConceptForm";

import "./listConceptos.scss";

const { confirm } = ModalAntd;

export default function LisConceptos(props) {
  const { listConceptos, setReloadConceptos } = props;
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);
  const { nombre } = useParams();

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
          })
          .catch((err) => {
            notification["err"]({
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
      "Permite actualizar la infromación y el avatar del usuario ",

    botonEliminar: "Boton Eliminar",
    ContenidoBotonEliminar: "Permite Eliminar un registro",

    botonPrevisualizar: "Previsualizar Concepto",
    ContenidoBotonPrevisualizar: "Permite ver el concepto en una ventana nueva",

    botonDescargar: "Descargar Concepto",
    ContenidoBotonDescargar: "Permite descargar una copia del concepto",
  };

  return (
    <div className="list-conceptos">
      <div className="list-conceptos__header">
        <h2 className="list-conceptos__header__h2">
          {`Conceptos del año ${nombre}`}
        </h2>
        <Button
          type="primary"
          icon={<FolderAddOutlined />}
          onClick={AddConcepModal}
        >
          Nuevo Concepto
        </Button>
      </div>
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
