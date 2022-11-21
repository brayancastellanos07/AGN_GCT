import React, { useState } from "react";
import { List, Popover, Button, Modal as ModalAntd, notification,BackTop } from "antd";
import Modal from "../../../modal/Modal";
import {
  EditOutlined,
  DeleteOutlined,
  FolderOutlined,
  FolderAddOutlined,
  UpCircleOutlined,
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

  const content = (
    {
        botonActualizar:"Boton Actualizar",
        ContenidoBotonActualizar:"Permite actualizar la infromación de un registro  ",
       
        botonEliminar:"Boton Eliminar",
        ContenidoBotonEliminar:"Permite Eliminar un registro",
    }
  )
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
      <BackTop>
      <div className="Up"><UpCircleOutlined /></div>
    </BackTop>
    </div>
  );
}

function ListCarpeta(props) {
  const { data, EditCarpetas, showDeletConfirm, content } = props;
  const { info } = ModalAntd;
  const showHelpRols = () => {
    info({
      title: "Descripción de las carpetas",
      content: (
        <>
          <div>
            <h3>Carpetas </h3>
            <p>
              Una <b>"carpeta"</b> permite ordenar los 
              conceptos, El nombre de las carpetas se asignan segun el año
            </p>
            <p>
              Para eliminar una carpeta esta no debe tener <b>ningun concepto asigando</b>
            </p>
          </div>
        </>
      ),
    });
  };

  return (
    <List.Item
      actions={[
        <Popover content={content.ContenidoBotonActualizar} title={content.botonActualizar}>
        <Button type="primary" onClick={() => EditCarpetas(data)}>
          <EditOutlined />
        </Button>
        </Popover>,

         <Popover content={content.ContenidoBotonEliminar} title={content.botonEliminar}>
        <Button type="danger" onClick={() => showDeletConfirm(data)}>
          <DeleteOutlined />
        </Button>
        </Popover>
        ,
      ]}
    >
      <List.Item.Meta
       
        avatar={
        <Button icon={<FolderOutlined />}
        onClick={() => showHelpRols()}
        />
        }
        title={`
        Carpeta: ${data.nombre}`}
        description={`Descripción: ${data.descripcion}`}
      />
    </List.Item>
  );
}
