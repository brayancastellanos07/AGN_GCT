import React, { useState } from "react";
import { Switch, List, Avatar, Button, Icon } from "antd";
import avatar from "../../../../assets/img/png/avatar.png";
import { EditOutlined, DeleteOutlined, StopOutlined,CheckOutlined } from "@ant-design/icons";

import "./ListUsers.scss";

export default function ListUsers(props) {
  const { usersActive, userInActive } = props;
  const [viewUsersActives, setViewUsersActive] = useState(true);
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
        <UsersActive usersActive={usersActive} />
      ) : (
        <UserInactive userInActive={userInActive}/>
      )}
    </div>
  );
}

function UsersActive(props) {
  const { usersActive } = props;
  console.log(props);
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
              onClick={() => console.log("Editar Usuarios")}
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
            avatar={<Avatar src={avatar} />}
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
    const {userInActive} = props
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
                avatar={<Avatar src={avatar} />}
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
