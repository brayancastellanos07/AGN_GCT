import React, { useState, useEffect } from "react";
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
import { getAvatarApi } from "../../../../api/user";

import "./ListUsers.scss";

export default function ListUsers(props) {
  const { usersActive, userInActive,setReloadUsers } = props;
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
          setReloadUsers={setReloadUsers}
        />
      ) : (
        <UsersInactive userInActive={userInActive} />
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
  const { usersActive, setIsVisibleModal, setModalTitle, setModalContent, setReloadUsers } =
    props;

  const edituser = (data) => {
    setIsVisibleModal(true);
    setModalTitle(`Editar ${data.nombre} ${data.apellido}`);
    setModalContent(<EditUserForm data={data}  setIsVisibleModal={setIsVisibleModal} setReloadUsers={setReloadUsers}/>);
  };
  return (
    <List
      className="users-active"
      itemLayout="horizontal"
      dataSource={usersActive}
      renderItem={(data) => <UserActive data={data} edituser={edituser} />}
    />
  );
}

function UserActive(props) {
  const { data, edituser } = props;
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    if (data.avatar) {
      getAvatarApi(data.avatar).then((Response) => {
        setAvatar(Response);
      });
    } else {
      setAvatar(null);
    }
  }, [data]);

  return (
    <List.Item
      actions={[
        <Button type="primary" onClick={() => edituser(data)}>
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
        avatar={<Avatar src={avatar ? avatar : Noavatar} />}
        title={`
                  ${data.nombre}
                  
                  ${data.apellido}
                  `}
        description={`${data.tipodocumento}
                  ${data.documento}
                  Telefono:
                  ${data.telefono}
                  Rol:
                  ${data.rol === 1 ? "Super Administrador" : "Administrador"}
                  Correo:
                  ${data.correo}
                  Estado: 
                  ${data.status ? "Activo" : "Inactivo"}`}
      />
    </List.Item>
  );
}

function UsersInactive(props) {
  const { userInActive } = props;
  return (
    <List
      className="users-active"
      itemLayout="horizontal"
      dataSource={userInActive}
      renderItem={(data) => <UserInactive data={data} />}
    />
  );
}

function UserInactive(props) {
  const { data } = props;
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    if (data.avatar) {
      getAvatarApi(data.avatar).then((Response) => {
        setAvatar(Response);
      });
    } else {
      setAvatar(null);
    }
  }, [data]);

  return (
    <List.Item
      actions={[
        <Button type="primary" onClick={() => console.log("Activar Usuarios")}>
          <CheckOutlined />
        </Button>,
        <Button type="danger" onClick={() => console.log("Desde eliminar")}>
          <DeleteOutlined />
        </Button>,
      ]}
    >
      <List.Item.Meta
        avatar={<Avatar src={avatar ? avatar : Noavatar} />}
        title={`
                      ${data.nombre}
                      
                      ${data.apellido}
                      `}
        description={`${data.tipodocumento}
                      ${data.documento}
                      Telefono:
                      ${data.telefono}
                      Rol:
                      ${
                        data.rol === 1 ? "Super Administrador" : "Administrador"
                      }
                      Correo:
                      ${data.correo}
                      Estado: 
                      ${data.status ? "Activo" : "Inactivo"}`}
      />
    </List.Item>
  );
}
