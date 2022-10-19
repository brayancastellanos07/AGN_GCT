import { List, Button, Modal as ModalAntd, notification } from "antd";
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
} from "@ant-design/icons";
import { deleteConceptApi } from "../../../../api/conceptos";
import EditConceptForm from"../EditConceptForm/EditConceptForm";
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

  const EditConceptos = (data) =>{
    setIsVisibleModal(true);
    setModalTitle(`Editar el concepto: ${data.nombre}`);
    setModalContent(
      <EditConceptForm
      data={data}
      setIsVisibleModal={setIsVisibleModal}
      setReloadConceptos={setReloadConceptos}
      />
    )
  }
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
            setReloadConceptos={setReloadConceptos}
            showDeleteConfirmConcept={showDeleteConfirmConcept}
            EditConceptos={EditConceptos}
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
  const { data, showDeleteConfirmConcept,EditConceptos } = props;

  return (
    <List.Item
      actions={[
        <Button type="primary" onClick={() => EditConceptos(data)}>
          <EditOutlined />
        </Button>,
        <Button type="danger" onClick={() => showDeleteConfirmConcept(data)}>
          <DeleteOutlined />
        </Button>,
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
