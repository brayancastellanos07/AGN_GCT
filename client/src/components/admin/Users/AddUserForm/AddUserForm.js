import React, { useState } from "react";
import {
  Form,
  Input,
  Select,
  Checkbox,
  Button,
  Row,
  Col,
  notification,
} from "antd";
import { createUserApi } from "../../../../api/user";
import { getAccessToken } from "../../../../api/auth";
import {
  UserOutlined,
  IdcardOutlined,
  TabletOutlined,
  MailOutlined,
  LockOutlined,
} from "@ant-design/icons";
import "./AddUserForm.scss";

export default function AddUserForm(props) {
  const { setIsVisibleModal, setReloadUsers } = props;
  const [userData, setUserData] = useState({});

  const addUser = event => {
    
   
    let userCreateData = userData;
  
    if (
      !userCreateData.Nombre ||
      !userCreateData.Apellido ||
      !userCreateData.tipodocumento ||
      !userCreateData.documento ||
      !userCreateData.telefono ||
      !userCreateData.rol ||
      !userCreateData.Correo ||
      !userCreateData.contrasena ||
      !userCreateData.repetirContrasena
    ) {
      notification["error"]({
        message: "Todos los campos son obligatorios. ",
      });
    } else if (userCreateData.contrasena !== userCreateData.repetirContrasena) {
      notification["error"]({
        message: "Las contraseñas tienen que ser iguales.",
      });
    } else {
      const accesToken = getAccessToken();

      createUserApi(accesToken, userCreateData)
        .then((response) => {
          notification["success"]({
            message: response,
          });
          setIsVisibleModal(false);
          setReloadUsers(true);
          setUserData({});
        })
        .catch((err) => {
          notification["error"]({
            message: err,
          });
        });
        
    }
  };
  return (
    <div className="add-user-form">
      <AddForm
        userData={userData}
        setUserData={setUserData}
        addUser={addUser}
      />
    </div>
  );
}

function AddForm(props) {
  const { userData, setUserData, addUser } = props;
  const { Option } = Select;

  return (
    <Form className="form-add" onFinish={addUser}>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<UserOutlined />}
              placeholder="Nombre"
              value={userData.nombre}
              minLength={5}
              onChange={(e) =>
                setUserData({ ...userData, Nombre: e.target.value })
              }
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<UserOutlined />}
              placeholder="Apellido"
              value={userData.apellido}
              minLength={5}
              onChange={(e) =>
                setUserData({ ...userData, Apellido: e.target.value })
              }
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item>
            <Select
              placeholder="Tipo Documento"
              onChange={(e) => setUserData({ ...userData, tipodocumento: e })}
              value={userData.tipodocumento}
            >
              <Option value="Cedula" name="Cedula">
                Cédula
              </Option>
              <Option value="Pasaporte" name="Pasaporte">
                Pasaporte
              </Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<IdcardOutlined />}
              placeholder="Documento"
              value={userData.documento}
              minLength={6}
              onChange={(e) =>
                setUserData({ ...userData, documento: e.target.value })
              }
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<TabletOutlined />}
              placeholder="Telefono"
              value={userData.telefono}
              type="number"
              onChange={(e) =>
                setUserData({ ...userData, telefono: e.target.value })
              }
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item>
            <Select
              placeholder="Seleccione un Rol"
              onChange={(e) => {
                setUserData({ ...userData, rol: e });
              }}
              value={userData.rol}
            >
              {userData.rol === 1 ? "Super Administrador" : "Administrador"}
              <Option value={1}>Super Administrador</Option>
              <Option value={2}>Administrador</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<MailOutlined />}
              placeholder="Correo"
              type="email"
              value={userData.correo}
              onChange={(e) =>
                setUserData({ ...userData, Correo: e.target.value })
              }
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item>
            <Checkbox
              checked={userData.status}
              onChange={(e) =>
                setUserData({ ...userData, status: e.target.checked })
              }
            >
              Activar usuario
            </Checkbox>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<LockOutlined />}
              placeholder="Contraseña"
              type="password"
              onChange={(e) =>
                setUserData({ ...userData, contrasena: e.target.value })
              }
              value={userData.contrasena}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<LockOutlined />}
              placeholder="Repetir Contraseña"
              type="password"
              onChange={(e) =>
                setUserData({ ...userData, repetirContrasena: e.target.value })
              }
              value={userData.repetirContrasena}
            />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="btn-submit">
          Crear Usuario
        </Button>
      </Form.Item>
    </Form>
  );
}
