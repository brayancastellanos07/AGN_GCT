import React, { useState } from "react";
import { List, Popover, Button, Modal as ModalAntd } from "antd";
import { EditOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import Modal from "../../../modal/Modal";

import "./ListRols.scss";
import EditRolsForm from "../EditRolsForm/EditRolsForm";
const { info } = ModalAntd;
export default function ListRols(props) {
  const { listRols, setReloadRols } = props;
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  const showHelpRols = () => {
    info({
      title: "Descripción de los roles",
      content: (
        <>
          <div>
            <h3>Super Administrador: </h3>
            <p>
              Un <b>"super administrador"</b> es un usuario que tiene acceso
              completo a todos los objetos, carpetas, definición de roles,
              usuarios y conceptos
            </p>
          </div>

          <div>
            <h3>Administrador: </h3>
            <p>
              Un <b>"Administrador"</b> es un usuario que tiene acceso
              unicamente a las carpetas y los conceptos
            </p>
          </div>
        </>
      ),
    });
  };

  const content = {
    botonActualizar: "Boton Actualizar",
    ContenidoBotonActualizar:
      "Permite actualizar la infromación de un registro ",
  };
  return (
    <div className="list-rols">
      <div className="list-rols__header">
        <h2 className="list-rols__header__h2">Roles activos en el sistema</h2>
      </div>
      <List
        itemLayout="horizontal"
        dataSource={listRols}
        renderItem={(data) => (
          <ListRol
            data={data}
            setReloadRols={setReloadRols}
            showHelpRols={showHelpRols}
            setIsVisibleModal={setIsVisibleModal}
            setModalTitle={setModalTitle}
            setModalContent={setModalContent}
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

function ListRol(props) {
  const {
    data,
    setReloadRols,
    setModalContent,
    setModalTitle,
    showHelpRols,
    setIsVisibleModal,
    content,
  } = props;

  const editarrol = (data) => {
    setIsVisibleModal(true);
    setModalTitle(`Editar ${data.Nombre}`);
    setModalContent(
      <EditRolsForm
        data={data}
        setIsVisibleModal={setIsVisibleModal}
        setReloadRols={setReloadRols}
      />
    );
  };

  return (
    <List.Item
      actions={[
        <Popover
          content={content.ContenidoBotonActualizar}
          title={content.botonActualizar}
        >
          <Button type="primary" onClick={() => editarrol(data)}>
            <EditOutlined />
          </Button>
          
        </Popover>
      ]}
    >
      <List.Item.Meta
        avatar={
          <Button
            icon={<QuestionCircleOutlined />}
            onClick={() => showHelpRols()}
          />
        }
        title={` Rol: ${data.nombre}`}
        description={`Descripción: ${data.descripcion}`}
      />
    </List.Item>
  );
}
