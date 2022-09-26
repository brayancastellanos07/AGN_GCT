import React, { useCallback, useState, useEffect } from "react";
import { Avatar, Form, Input, Select, Button, Row, Col, Checkbox } from "antd";
import { useDropzone } from "react-dropzone";
import Noavatar from "../../../../assets/img/png/no-avatar.png";
import {
  UserOutlined,
  IdcardOutlined,
  TabletOutlined,
  MailOutlined,
  LockOutlined,
} from "@ant-design/icons";

import "./EditUserForm.scss";

export default function EditUserForm(props) {
  const { data } = props;
  const [avatar, setAvatar] = useState(null);
  const [userData, setUserData] = useState({
    nombre: data.nombre,
    apellido: data.apellido,
    tipodocumento: data.tipodocumento,
    documento: data.documento,
    telefono: data.telefono,
    rol: data.rol,
    correo: data.correo,
    contrasena: data.contrasena,
    status: data.status,
    avatar: data.avatar,
  });

  useEffect(() => {
    if (avatar) {
      setUserData({ ...userData, avatar });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [avatar]);

  const updateUser = (e) => {
    console.log(userData);
  };

  return (
    <div className="edit-user-form">
      <UploadAvatar avatar={avatar} setAvatar={setAvatar} />
      <EditForm
        data={data}
        userData={userData}
        setUserData={setUserData}
        updateUser={updateUser}
      />
    </div>
  );
}

function UploadAvatar(props) {
  const { avatar, setAvatar } = props;

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      setAvatar({ file, preview: URL.createObjectURL(file) });
    },
    [setAvatar]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/jpeg, image/png",
    noKeyboard: true,
    onDrop,
  });

  return (
    <div className="upload-avatar" {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <Avatar size={150} src={Noavatar} />
      ) : (
        <Avatar size={150} src={avatar ? avatar.preview : Noavatar} />
      )}
    </div>
  );
}

function EditForm(props) {
  const { userData, setUserData, updateUser } = props;
  const { Option } = Select;
  return (
    <Form className="form-edit" onFinish={updateUser}>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<UserOutlined />}
              placeholder="Nombre"
              defaultValue={userData.nombre}
              onChange={(e) =>
                setUserData({ ...userData, nombre: e.target.value })
              }
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<UserOutlined />}
              placeholder="Apellido"
              defaultValue={userData.apellido}
              onChange={(e) =>
                setUserData({ ...userData, apellido: e.target.value })
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
              defaultValue={userData.tipodocumento}
            >
              <Option value="Cedula" name="Cedula">Cédula</Option>
              <Option value="Pasaporte" name="Pasaporte">Pasaporte</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<IdcardOutlined />}
              placeholder="Documento"
              defaultValue={userData.documento}
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
              defaultValue={userData.telefono}
              onChange={(e) =>
                setUserData({ ...userData, telefono: e.target.value })
              }
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item>
            <Select
              placeholder="Rol"
              onChange={(e) =>
                setUserData({ ...userData, rol: e.target.value })
              }
              defaultValue={userData.rol}
            >
              <Option value="1">Super Administrador</Option>
              <Option value="2">Administrador</Option>
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
              defaultValue={userData.correo}
              onChange={(e) =>
                setUserData({ ...userData, correo: e.target.value })
              }
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item>
            <Checkbox defaultChecked={userData.status} onChange={e => setUserData({ ...userData, status: e.target.value })}>{userData.status ? ("Activo"): ("Inactivo")}</Checkbox>
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
            />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="btn-submit">
          Actualziar Usuario
        </Button>
      </Form.Item>
    </Form>
  );
}
