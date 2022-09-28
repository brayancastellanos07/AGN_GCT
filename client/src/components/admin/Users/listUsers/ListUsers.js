import React, { useState, useEffect } from "react";
import {
  Switch,
  List,
  Avatar,
  Button,
  notification,
  Modal as ModalAntd,
} from "antd";
import Noavatar from "../../../../assets/img/png/no-avatar.png";
import {
  EditOutlined,
  DeleteOutlined,
  StopOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import Modal from "../../../modal/Modal";
import EditUserForm from "../EditUsersForm/EditUserForm";
import {
  getAvatarApi,
  activateUserApi,
  deleteUserApi,
} from "../../../../api/user";
import { getAccessToken } from "../../../../api/auth";
import AddUserForm from "../AddUserForm";

import "./ListUsers.scss";

const { confirm } = ModalAntd;

export default function ListUsers(props) {
  const { usersActive, userInActive, setReloadUsers } = props;
  const [viewUsersActives, setViewUsersActive] = useState(true);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  const showDeletConfirm = (data) => {
    const accesToken = getAccessToken();

    confirm({
      title: "Eliminar Usuario",
      content: `¿Esta seguro de Eliminar el Usuario ${data.correo}?`,
      okText: "Eliminar",
      okType: "danger",
      cancelText: "Cancelar",
      onOk() {
        deleteUserApi(accesToken, data.id)
          .then((response) => {
            notification["success"]({
              message: response,
            });
            setReloadUsers(true);
          })
          .catch((err) => {
            notification["err"]({
              message: err.message,
            });
          });
      },
    });
  };
 
 
 
  const addUserModal= () =>{
      setIsVisibleModal(true);
      setModalTitle("Creando nuevo usuario. ");
      setModalContent(
        <AddUserForm setIsVisibleModal={setIsVisibleModal}  setReloadUsers={setReloadUsers}/>
      )
  }
  return (
    <div className="list-users">
      <div className="list-users__header">
      <div className="list-users__users__header-switch">
        <Switch
          defaultChecked
          onChange={() => setViewUsersActive(!viewUsersActives)}
        />
        <span>
          {viewUsersActives ? "  Usuarios Activos" : "  Usuarios Inactivos"}
        </span>
      </div>
      <Button type="primary" onClick={addUserModal}>
        Nuevo Usuario
      </Button>
      </div>
      
      {viewUsersActives ? (
        <UsersActive
          usersActive={usersActive}
          setIsVisibleModal={setIsVisibleModal}
          setModalTitle={setModalTitle}
          setModalContent={setModalContent}
          setReloadUsers={setReloadUsers}
          showDeletConfirm={showDeletConfirm}
        />
      ) : (
        <UsersInactive
          userInActive={userInActive}
          setReloadUsers={setReloadUsers}
          showDeletConfirm={showDeletConfirm}
        />
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
  const {
    usersActive,
    setIsVisibleModal,
    setModalTitle,
    setModalContent,
    setReloadUsers,
    showDeletConfirm,
  } = props;

  const edituser = (data) => {
    setIsVisibleModal(true);
    setModalTitle(`Editar ${data.nombre} ${data.apellido}`);
    setModalContent(
      <EditUserForm
        data={data}
        setIsVisibleModal={setIsVisibleModal}
        setReloadUsers={setReloadUsers}
      />
    );
  };
  return (
    <List
      className="users-active"
      itemLayout="horizontal"
      dataSource={usersActive}
      renderItem={(data) => (
        <UserActive
          data={data}
          edituser={edituser}
          setReloadUsers={setReloadUsers}
          showDeletConfirm={showDeletConfirm}
        />
      )}
    />
  );
}

function UserActive(props) {
  const { data, edituser, setReloadUsers, showDeletConfirm } = props;
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

  const desactivateUser = () => {
    const accesToken = getAccessToken();

    activateUserApi(accesToken, data.id, false)
      .then((response) => {
        notification["success"]({
          message: response.message,
        });
        setReloadUsers(true);
      })
      .catch((error) => {
        notification[error]({
          message: error.message,
        });
      });
  };

  return (
    <List.Item
      actions={[
        <Button type="primary" onClick={() => edituser(data)}>
          <EditOutlined />
        </Button>,
        <Button type="danger" onClick={desactivateUser}>
          <StopOutlined />
        </Button>,
        <Button type="danger" onClick={() => showDeletConfirm(data)}>
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
  const { userInActive, setReloadUsers, showDeletConfirm } = props;
  return (
    <List
      className="users-active"
      itemLayout="horizontal"
      dataSource={userInActive}
      renderItem={(data) => (
        <UserInactive
          data={data}
          setReloadUsers={setReloadUsers}
          showDeletConfirm={showDeletConfirm}
        />
      )}
    />
  );
}

function UserInactive(props) {
  const { data, setReloadUsers, showDeletConfirm } = props;
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

  const activateUser = () => {
    const accesToken = getAccessToken();

    activateUserApi(accesToken, data.id, true)
      .then((response) => {
        notification["success"]({
          message: response.message,
        });
        setReloadUsers(true);
      })
      .catch((error) => {
        notification[error]({
          message: error.message,
        });
      });
  };
  return (
    <List.Item
      actions={[
        <Button type="primary" onClick={activateUser}>
          <CheckOutlined />
        </Button>,
        <Button type="danger" onClick={() => showDeletConfirm(data)}>
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
