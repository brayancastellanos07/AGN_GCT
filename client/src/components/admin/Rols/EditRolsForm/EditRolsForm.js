import React, { useState, useEffect } from "react";
import { updateRolsApi } from "../../../../api/rols";
import { getAccessToken } from "../../../../api/auth";
import "./EditRolsForm.scss";
import { Col, Form, Input, notification, Row, Button } from "antd";
const { TextArea } = Input;
export default function EditRolsForm(props) {
  const { data, setIsVisibleModal, setReloadRols } = props;
  const [rolData, setRolData] = useState({});

  useEffect(() => {
    setRolData({
      nombre: data.nombre,
      descripcion: data.descripcion,
    });
  }, [data]);


  const updateRols = (e) => {
    const token = getAccessToken();

    let rolUpdate = rolData;

    if (!rolUpdate.nombre || !rolUpdate.descripcion) {
      notification["error"]({
        message: "Todos los campos son obligatorios. ",
      });
      return;
    } else {
      updateRolsApi(token, rolUpdate, data.id).then((result) => {
        notification["success"]({
          message: result.message,
        });
        setReloadRols(true);
      });
    }
    setIsVisibleModal(false);
  };

  return (
    <div className="edit-rols-form">
      <EditRols
        data={data}
        rolData={rolData}
        setRolData={setRolData}
        updateRols={updateRols}
      />
    </div>
  );
}

function EditRols(props) {
  const { rolData, setRolData, updateRols } = props;

  return (
    <Form className="form-edit" onFinish={updateRols}>
      <Row gutter={24}>
        <Col span={24}>
          <Form.Item>
            <Input
              placeholder="Nombre del Rol "
              value={rolData.nombre}
              //readOnly="readonly"
              onChange={(e) =>
                setRolData({ ...rolData, nombre: e.target.value })
              }
            />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item>
            <TextArea
              showCount
              required={true}
              maxLength={150}
              placeholder="Descripción del Rol "
              value={rolData.descripcion}
              onChange={(e) =>
                setRolData({ ...rolData, descripcion: e.target.value })
              }
            />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="btn-submit">
          Actualziar Rol
        </Button>
      </Form.Item>
    </Form>
  );
}
