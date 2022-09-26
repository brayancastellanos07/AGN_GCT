import React, { useState } from "react";
import { Switch, List, Avatar, Button } from "antd";
import Noavatar from "../../../../assets/img/png/no-avatar.png";
import {
  EditOutlined,
  DeleteOutlined,
  StopOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import Modal from "../../../modal/Modal";
import EditUserForm from "../EditUsersForm/EditUserForm";

import "./ListUsers.scss";

export default function ListUsers(props) {
  const { usersActive, userInActive } = props;
  const [viewUsersActives, setViewUsersActive] = useState(true);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);
  return (
    <div className="list-users">
      <div className="list-users__switch">
        <Switch
          defaultChecked
          onChange={() => setViewUsersActive(!viewUsersActives)}
        />
        <span>
          {viewUsersActives ? "Usuarios Activos" : "Usuarios Inactivos"}
        </span>
      </div>
      {viewUsersActives ? (
        <UsersActive
          usersActive={usersActive}
          setIsVisibleModal={setIsVisibleModal}
          setModalTitle={setModalTitle}
          setModalContent={setModalContent}
        />
      ) : (
        <UserInactive userInActive={userInActive} />
      )}
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

function UsersActive(props) {
  const { usersActive, setIsVisibleModal, setModalTitle, setModalContent } = props;

  const edituser = data =>{
    setIsVisibleModal(true);
    setModalTitle(`Editar ${data.nombre} ${data.apellido}`);
    setModalContent(<EditUserForm data={data}/>)
  }
  return (
    <List
      className="users-active"
      itemLayout="horizontal"
      dataSource={usersActive}
      renderItem={(data) => (
        <List.Item
          actions={[
            <Button
              type="primary"
              onClick={() => edituser(data)}
            >
              <EditOutlined />
            </Button>,
            <Button
              type="danger"
              onClick={() => console.log("Desde desactivar usuario")}
            >
              <StopOutlined />
            </Button>,
            <Button type="danger" onClick={() => console.log("Desde eliminar")}>
              <DeleteOutlined />
            </Button>,
          ]}
        >
          <List.Item.Meta
            avatar={<Avatar src={data.avatar ? data.avatar : Noavatar} />}
            
            title={`
                  ${data.nombre}
                  
                  ${data.apellido}
                  `}
            description={`${data.tipodocumento}
                  ${data.documento}
                  Telefono:
                  ${data.telefono}
                  Rol:
                  ${data.rol}
                  Correo:
                  ${data.correo}
                  Estado: 
                  ${data.status}`}
          />
        </List.Item>
      )}
    />
  );
}

function UserInactive(props) {
  const { userInActive } = props;
  return (
    <List
      className="users-active"
      itemLayout="horizontal"
      dataSource={userInActive}
      renderItem={(data) => (
        <List.Item
          actions={[
            <Button
              type="primary"
              onClick={() => console.log("Activar Usuarios")}
            >
              <CheckOutlined />
            </Button>,
            <Button type="danger" onClick={() => console.log("Desde eliminar")}>
              <DeleteOutlined />
            </Button>,
          ]}
        >
          <List.Item.Meta
            avatar={<Avatar src={data.avatar ? data.avatar : Noavatar} />}
            title={`
                      ${data.nombre}
                      
                      ${data.apellido}
                      `}
            description={`${data.tipodocumento}
                      ${data.documento}
                      Telefono:
                      ${data.telefono}
                      Rol:
                      ${data.rol}
                      Correo:
                      ${data.correo}
                      Estado: 
                      ${data.status}`}
          />
        </List.Item>
      )}
    />
  );
}
