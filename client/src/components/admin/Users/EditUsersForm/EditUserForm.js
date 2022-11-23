import React, { useCallback, useState, useEffect } from "react";
import {
  Avatar, 
  Form,
  Input,
  Select,
  Button,
  Row,
  Col,
  Checkbox,
  notification,
} from "antd";
import { useDropzone } from "react-dropzone";
import Noavatar from "../../../../assets/img/png/no-avatar.png";
import {
  UserOutlined,
  IdcardOutlined,
  TabletOutlined,
  MailOutlined,
  LockOutlined,
} from "@ant-design/icons";
import {
  updateUserApi,
  uploadAvatarApi,
  getAvatarApi,
} from "../../../../api/user";
import { getAccessToken } from "../../../../api/auth";

import "./EditUserForm.scss";

export default function EditUserForm(props) {
  const { data, setIsVisibleModal, setReloadUsers } = props;
  const [avatar, setAvatar] = useState(null);
  const [userData, setUserData] = useState({});
  
  // carga los datos en el formulario 
  useEffect(() => {
    setUserData({
      nombre: data.nombre,
      apellido: data.apellido,
      tipodocumento: data.tipodocumento,
      documento: data.documento,
      telefono: data.telefono,
      rol: data.rol,
      correo: data.correo,
      contrasena: "",
      repetirContrasena: "",
      status: data.status,
      avatar: data.avatar,
    });
  }, [data]);
  console.log("userData",userData)
  // revisa si se tiene avatar y lo carga en el formulario 
  useEffect(() => {
    if (data.avatar) {
      getAvatarApi(data.avatar).then((response) => {
        setAvatar(response);
      });
    } else {
      setAvatar(null);
    }
  }, [data]);

  // carga el archivo en la data 
  useEffect(() => {
    if (avatar) {
      setUserData({ ...userData, avatar: avatar.file });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [avatar]);

  const updateUser = (e) => {
    
    const token = getAccessToken();
    let userUpdate = userData;
    console.log("userUpdate",userUpdate)
    if (
      !userUpdate.nombre ||
      !userUpdate.apellido ||
      !userUpdate.tipodocumento ||
      !userUpdate.documento ||
      !userUpdate.telefono ||
      !userUpdate.rol ||
      !userUpdate.correo 
    ) {
      notification["error"]({
        message: "Todos los campos son obligatorios. ",
      });
      return;
    }

    if (userUpdate.contrasena || userUpdate.repetirContrasena) {
      if (userUpdate.contrasena !== userUpdate.repetirContrasena) {
        notification["error"]({
          message: "Las contraseñas tienen que ser iguales.",
        });
        return;
      }
      else{
        delete userUpdate.repetirContrasena
      }
    }

    if (typeof userUpdate.avatar === "object") {
      // esta entrando al if cuando el avatar esta vacio y se estalla 
      uploadAvatarApi(token, userUpdate.avatar, data.id).then((response) => {
        userUpdate.avatar = response.avatarName;
        
        updateUserApi(token, userUpdate, data.id).then(result => {
          notification["success"]({
            message: result,
          });
          setReloadUsers(true);
        });
      });
    } else {
      
      updateUserApi(token, userUpdate, data.id).then(result => {
        notification["success"]({
          message: result.message,
        });
        setReloadUsers(true);
      });
    }
    setIsVisibleModal(false);
 
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
  const [avatarUrl, setAvatarUrl] = useState(null);

  useEffect(() => {
    if (avatar) {
      if (avatar.preview) {
        setAvatarUrl(avatar.preview);
       
      } else {
        setAvatarUrl(avatar);
      }
    } else {
      setAvatarUrl(avatar);
    }
  }, [avatar]);

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
        <Avatar size={150} src={avatarUrl ? avatarUrl : Noavatar} />
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
              value={userData.nombre}
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
              value={userData.apellido}
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
              value={
                userData.rol  === 1 ? "Super Administrador" : "Administrador"
              }
            >
              {userData.rol === 1 ? "Super Administrador" : "Administrador"}
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
              value={userData.correo}
              onChange={(e) =>
                setUserData({ ...userData, correo: e.target.value })
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
              // disabled={true}
            >
              {userData.status ? "Activo" : "Inactivo"}
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
          Actualziar Usuario
        </Button>
      </Form.Item>
    </Form>
  );
}
