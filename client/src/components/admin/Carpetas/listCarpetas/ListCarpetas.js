import React, { useState } from "react";
import { List, Button, Modal as ModalAntd, notification } from "antd";
import Modal from "../../../modal/Modal";
import {
  EditOutlined,
  DeleteOutlined,
  FolderOutlined,
  FolderAddOutlined,
} from "@ant-design/icons";

import EditCarpetasForm from "../EditCarpetasForm/EditCarpetasForm";
import AddCarpetasForm from "../AddCarpetasForm";
import "./ListCarpetas.scss";
import { getAccessToken } from "../../../../api/auth";
import { deleteCarpetasApi } from "../../../../api/carpetas";

const { confirm } = ModalAntd;

export default function ListCarpetas(props) {
  const { listCarpetas, setReloadCarpetas } = props;
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);
  // const [datasort, setDataordenada] = useState([]);

  // useEffect(()=>{
  //   const datasortfinal = [...datasort].sort((a,b) => (a.nombre > b.nombre)? -1:1)
  //   setDataordenada(datasortfinal);
  //   console.log("aqui",datasortfinal);
  // },[])

  const showDeletConfirm = (data) => {
    const accesToken = getAccessToken();

    confirm({
      title: "Eliminar carpeta",
      content: `¿Esta seguro de Elimianr la carpeta ${data.nombre}?`,
      okText: "Eliminar",
      okType: "danger",
      cancelText: "Cancelar",

      onOk() {
        deleteCarpetasApi(accesToken, data.id_carpeta)
          .then((response) => {
            notification["success"]({
              message: response,
            });
            setReloadCarpetas(true);
          })
          .catch((err) => {
            notification["err"]({
              message: err.message,
            });
          });
      },
    });
  };

  const addCarpetasModal = () => {
    setIsVisibleModal(true);
    setModalTitle("Creando una carpeta nueva");
    setModalContent(
      <AddCarpetasForm
        setIsVisibleModal={setIsVisibleModal}
        setReloadCarpetas={setReloadCarpetas}
      />
    );
  };
  const EditCarpetas = (data) => {
    setIsVisibleModal(true);
    setModalTitle(`Editar la carpeta:  ${data.nombre}`);
    setModalContent(
      <EditCarpetasForm
        data={data}
        setIsVisibleModal={setIsVisibleModal}
        setReloadCarpetas={setReloadCarpetas}
      />
    );
  };
  return (
    <div className="list-carpetas">
      <div className="list-carpetas__header">
        <h2 className="list-carpetas__header__h2">Carpetas por año</h2>
        <Button
          type="primary"
          icon={<FolderAddOutlined />}
          onClick={addCarpetasModal}
        >
          Nuevo Carpeta
        </Button>
      </div>
      <List
        className="carpetas"
        itemLayout="horizontal"
        dataSource={listCarpetas}
        renderItem={(data) => (
          <ListCarpeta
            data={data}
            EditCarpetas={EditCarpetas}
            setReloadCarpetas={setReloadCarpetas}
            setIsVisibleModal={setIsVisibleModal}
            setModalTitle={setModalTitle}
            setModalContent={setModalContent}
            showDeletConfirm={showDeletConfirm}
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
function ListCarpeta(props) {
  const { data, EditCarpetas, showDeletConfirm } = props;

  return (
    <List.Item
      actions={[
        <Button type="primary" onClick={() => EditCarpetas(data)}>
          <EditOutlined />
        </Button>,
        <Button type="danger" onClick={() => showDeletConfirm(data)}>
          <DeleteOutlined />
        </Button>,
      ]}
    >
      <List.Item.Meta
        avatar={<FolderOutlined />}
        title={`
        Carpeta: ${data.nombre}`}
        description={`Descripción: ${data.descripcion}`}
      />
    </List.Item>
  );
}
