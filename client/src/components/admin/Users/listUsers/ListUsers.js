import React, { useState, useEffect } from "react";
import {
  Switch,
  List,
  Avatar,
  Button,
  notification,
  Modal as ModalAntd,
  Input,
  Popover,
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
  searchUsersApi,
} from "../../../../api/user";
import { getAccessToken } from "../../../../api/auth";
import AddUserForm from "../AddUserForm";

import "./ListUsers.scss";

const { confirm } = ModalAntd;
const { Search } = Input;

export default function ListUsers(props) {
  const { usersActive, userInActive, setReloadUsers } = props;
  const [viewUsersActives, setViewUsersActive] = useState(true);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);
  const [searchUser, setsearchUser] = useState({});
  const [findUser, setfindUser] = useState({});
  const [viewUser, setviewUser] = useState(false);

  const content = {
    titleActualizarInactivo: "Boton Actualizar",
    contenidoActualizarInactivo:
      "El usuario no esta activo, un usuario inactivo no se puede actualizar",

    botonActualizar: "Boton Actualizar",
    ContenidoBotonActualizar:
      "Permite actualizar la infromación y el avatar del usuario ",

    botonDesactivar: "Boton Desactivar Usuario",
    ContenidoBotonDesactivar:
      "Permite desactivar un usuario, \n los usuarios desactivados no pueden ingresar al sistema",

    botonActivar: "Boton Activar Usuario",
    ContenidoBotonActivar: "Permite activar un usuario",

    botonEliminar: "Boton Eliminar",
    ContenidoBotonEliminar: "Permite Eliminar un registro",
  };

  const accesToken = getAccessToken();

  const showDeletConfirm = (data) => {
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
            notification["error"]({
              message: err.message,
            });
          });
      },
    });
  };

  const addUserModal = () => {
    setIsVisibleModal(true);
    setModalTitle("Creando nuevo usuario. ");
    setModalContent(
      <AddUserForm
        setIsVisibleModal={setIsVisibleModal}
        setReloadUsers={setReloadUsers}
      />
    );
  };

  const search = (searchUser) => {
    console.log("searchUser", searchUser);
    if (searchUser) {
      searchUsersApi(accesToken, searchUser)
        .then((response) => {
          notification["success"]({
            message: "Usuario Encontrado",
          });
          setfindUser(response.data);
          setviewUser(true);
        })
        .catch((err) => {
          notification["error"]({
            message: err.message,
          });
          setfindUser({});
          setviewUser(false);
        });
    } else {
      setfindUser({});
      setviewUser(false);
    }
  };

  return (
    <div className="list-users">
      <div className="list-users__header">
        <Search
          placeholder="Buscar Usuarios por nombre"
          style={{ width: 400 }}
          allowClear
          onSearch={search}
          onChange={(e) =>
            setsearchUser({ ...searchUser, dato: e.target.value })
          }
        />

        <div className="list-users__header__switch">
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
      {viewUser ? (
        <FindUsers
          findUser={findUser}
          setfindUser={setfindUser}
          setviewUser={setviewUser}
          setIsVisibleModal={setIsVisibleModal}
          setModalTitle={setModalTitle}
          setModalContent={setModalContent}
          setReloadUsers={setReloadUsers}
          showDeletConfirm={showDeletConfirm}
          content={content}
        />
      ) : viewUsersActives ? (
        <UsersActive
          usersActive={usersActive}
          setIsVisibleModal={setIsVisibleModal}
          setModalTitle={setModalTitle}
          setModalContent={setModalContent}
          setReloadUsers={setReloadUsers}
          showDeletConfirm={showDeletConfirm}
          content={content}
        />
      ) : (
        <UsersInactive
          userInActive={userInActive}
          setReloadUsers={setReloadUsers}
          showDeletConfirm={showDeletConfirm}
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
    content,
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
          content={content}
        />
      )}
    />
  );
}

function UserActive(props) {
  const { data, edituser, setReloadUsers, showDeletConfirm, content } = props;
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
        <Popover
          content={content.ContenidoBotonActualizar}
          title={content.botonActualizar}
        >
          <Button type="primary" onClick={() => edituser(data)}>
            <EditOutlined />
          </Button>
        </Popover>,
        <Popover
          content={content.ContenidoBotonDesactivar}
          title={content.botonDesactivar}
        >
          <Button type="danger" onClick={desactivateUser}>
            <StopOutlined />
          </Button>
        </Popover>,
        <Popover
          content={content.ContenidoBotonEliminar}
          title={content.botonEliminar}
        >
          <Button type="danger" onClick={() => showDeletConfirm(data)}>
            <DeleteOutlined />
          </Button>
          ,
        </Popover>,
      ]}
    >
      <List.Item.Meta
        avatar={<Avatar src={avatar ? avatar : Noavatar} />}
        title={`
                  ${data.nombre}
                  
                  ${data.apellido}
                  `}
        description={`${data.tipodocumento}: 
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
  const { userInActive, setReloadUsers, showDeletConfirm, content } = props;
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
          content={content}
        />
      )}
    />
  );
}

function UserInactive(props) {
  const { data, setReloadUsers, showDeletConfirm, content } = props;
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
        <Popover
          content={content.ContenidoBotonActivar}
          title={content.botonActivar}
        >
          <Button type="primary" onClick={activateUser}>
            <CheckOutlined />
          </Button>
        </Popover>,
        <Popover
          content={content.ContenidoBotonEliminar}
          title={content.botonEliminar}
        >
          <Button type="danger" onClick={() => showDeletConfirm(data)}>
            <DeleteOutlined />
          </Button>
          ,
        </Popover>,
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

function FindUsers(props) {
  const {
    findUser,
    setfindUser,
    setviewUser,
    setIsVisibleModal,
    setModalTitle,
    setModalContent,
    setReloadUsers,
    showDeletConfirm,
    content,
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
    setfindUser({});
    setviewUser(false);
  };
  return (
    <List
      className="users-active"
      itemLayout="horizontal"
      dataSource={findUser}
      renderItem={(data) => (
        <ListfindUsers
          data={data}
          content={content}
          edituser={edituser}
          setReloadUsers={setReloadUsers}
          showDeletConfirm={showDeletConfirm}
        />
      )}
    />
  );
}

function ListfindUsers(props) {
  const { data, edituser, setReloadUsers, showDeletConfirm, content } = props;
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
        // activación del boton actualizar
        data.status === true ? (
          <Popover
            content={content.ContenidoBotonActualizar}
            title={content.botonActualizar}
          >
            <Button type="primary" onClick={() => edituser(data)}>
              <EditOutlined />
            </Button>
          </Popover>
        ) : (
          // desactivación del boton actualizar
          <Popover
            content={content.contenidoActualizarInactivo}
            title={content.titleActualizarInactivo}
          >
            <Button type="primary" onClick={() => edituser(data)} disabled>
              <EditOutlined />
            </Button>
          </Popover>
        ),
        // cambio del boton activar por el desactivar
        data.status === true ? (
          <Popover
            content={content.ContenidoBotonDesactivar}
            title={content.botonDesactivar}
          >
            <Button type="danger" onClick={desactivateUser}>
              <StopOutlined />
            </Button>
          </Popover>
        ) : (
          <Popover
            content={content.ContenidoBotonActivar}
            title={content.botonActivar}
          >
            <Button type="primary" onClick={activateUser}>
              <CheckOutlined />
            </Button>
          </Popover>
        ),
        <Popover
          content={content.ContenidoBotonEliminar}
          title={content.botonEliminar}
        >
          <Button type="danger" onClick={() => showDeletConfirm(data)}>
            <DeleteOutlined />
          </Button>
          ,
        </Popover>,
      ]}
    >
      <List.Item.Meta
        avatar={<Avatar src={avatar ? avatar : Noavatar} />}
        title={`
            ${data.nombre}
            
            ${data.apellido}
            `}
        description={`${data.tipodocumento}: 
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
