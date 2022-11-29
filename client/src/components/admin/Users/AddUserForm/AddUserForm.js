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
  EyeTwoTone,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
import "./AddUserForm.scss";

export default function AddUserForm(props) {
  const { setIsVisibleModal, setReloadUsers } = props;
  const [userData, setUserData] = useState({});
  
  const addUser = (event) => {
    let userCreateData = userData;
    setUserData({});
    if (
      !userCreateData.Nombre ||
      !userCreateData.Apellido ||
      !userCreateData.tipodocumento ||
      !userCreateData.documento ||
      !userCreateData.telefono ||
      !userCreateData.rol ||
      !userCreateData.Correo ||
      !userCreateData.status ||
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
              required={true}
              minLength={5}
              value={userData.Nombre}
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
              required={true}
              minLength={5}
              value={userData.Apellido}
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
              value={userData.tipodocumento}
              placeholder="Tipo Documento"
              onChange={(e) => setUserData({ ...userData, tipodocumento: e })}
              required={true}
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
              required={true}
              prefix={<IdcardOutlined />}
              placeholder="Documento"
              type="number"
              minLength={6}
              value={userData.documento}
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
              required={true}
              prefix={<TabletOutlined />}
              placeholder="Telefono"
              type="number"
              value={userData.telefono}
              onChange={(e) =>
                setUserData({ ...userData, telefono: e.target.value })
              }
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item>
            <Select
              required={true}
              placeholder="Seleccione un Rol"
              value={userData.rol}
              onChange={(e) => {
                setUserData({ ...userData, rol: e });
              }}
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
              required={true}
              prefix={<MailOutlined />}
              placeholder="Correo"
              type="email"
              value={userData.Correo}
              onChange={(e) =>
                setUserData({ ...userData, Correo: e.target.value })
              }
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item>
            <Checkbox
              checked={(userData.status = true)}
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
            <Input.Password
              required={true}
              prefix={<LockOutlined />}
              placeholder="Contraseña"
              value={userData.contrasena}
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
              onChange={(e) =>
                setUserData({ ...userData, contrasena: e.target.value })
              }
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item>
            <Input.Password
              required={true}
              prefix={<LockOutlined />}
              placeholder="Repetir Contraseña"
              type="password"
              value={userData.repetirContrasena}
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
              onChange={(e) =>
                setUserData({ ...userData, repetirContrasena: e.target.value })
              }
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
