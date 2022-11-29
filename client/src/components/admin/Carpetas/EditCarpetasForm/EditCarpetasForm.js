import React, { useState, useEffect } from "react";
import { Form, Input, Button, Row, Col, notification } from "antd";
import { updateCarpetasApi } from "../../../../api/carpetas";
import { getAccessToken } from "../../../../api/auth";
import { FolderOutlined } from "@ant-design/icons";

import "./EditCarpetasForm.scss";
const { TextArea } = Input;
export default function EditCarpetasForm(props) {
  const { data, setIsVisibleModal, setReloadCarpetas } = props;
  const [carpetasData, setCarpetasData] = useState({});
  
  useEffect(() => {
    setCarpetasData({
      Nombre: data.nombre,
      Descripcion: data.descripcion,
    });
  }, [data]);

  const updateCarpetas = (e) => {
    const token = getAccessToken();
    let carpetasUpdate = carpetasData;

    if (!carpetasUpdate.Nombre || !carpetasUpdate.Descripcion) {
      notification["error"]({
        message: "Todos los campos son obligatorios. ",
      });
      return;
    } else {
      updateCarpetasApi(token, carpetasData, data.id_carpeta).then((result) => {
        notification["success"]({
          message: result.message,
        });
        setReloadCarpetas(true);
      });
    }
    setIsVisibleModal(false);
  };

  return (
    <div className="edit-carpetas-form">
      <EditForm
        data={data}
        carpetasData={carpetasData}
        setCarpetasData={setCarpetasData}
        updateCarpetas={updateCarpetas}
      />
    </div>
  );
}

function EditForm(props) {
  const { carpetasData, setCarpetasData, updateCarpetas } = props;
  return (
    <Form className="form-edit" onFinish={updateCarpetas}>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item>
            <Input
            required={true}
              prefix={<FolderOutlined />}
              placeholder="Nombre de la carpeta"
              value={carpetasData.Nombre}
              onChange={(e) =>
                setCarpetasData({ ...carpetasData, Nombre: e.target.value })
              }
            />
          </Form.Item>
        </Col>
        <Col span={12}> 
        <Form.Item>
        <TextArea 
        required={true}
        showCount maxLength={100}
        placeholder="Descripción"
        value={carpetasData.Descripcion}
        onChange={ e => setCarpetasData({ ...carpetasData, Descripcion: e.target.value})}
        />
        </Form.Item>
        </Col>
      </Row>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="btn-submit">
              Actualziar Carpeta
        </Button>
      </Form.Item>
    </Form>
  );
}
