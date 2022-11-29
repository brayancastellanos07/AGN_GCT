import React, { useState } from "react";
import { Form, Input, Button, notification } from "antd";
import { getAccessToken } from "../../../../api/auth";
import { createCarpetasApi } from "../../../../api/carpetas";
import { FolderAddOutlined } from "@ant-design/icons";

import "./AddCarpetasForm";
const { TextArea } = Input;
export default function AddCarpetasForm(props) {
  const { setIsVisibleModal, setReloadCarpetas } = props;
  const [carpetasData, setCarpetasData] = useState({});
  
  const addCarpetas = (event) => {
    let carpetasCreateData = carpetasData;

    if (!carpetasCreateData.Nombre || !carpetasCreateData.Descripcion) {
      notification["error"]({
        message: "Todos los campos son obligatorios. ",
      });
    } else {
      const accesToken = getAccessToken();

      createCarpetasApi(accesToken, carpetasCreateData)
        .then((response) => {
          notification["success"]({
            message: response,
          });
          setIsVisibleModal(false);
          setReloadCarpetas(true);
         
            setCarpetasData({});
          
         
        })
        .catch((err) => {
          notification["error"]({
            message: err,
          });
          
        });
        
    }
   
  };

  return (
    <div className="add-carpetas-form">
      <AddForm
        carpetasData={carpetasData}
        setCarpetasData={setCarpetasData}
        addCarpetas={addCarpetas}
      />
    </div>
  );
}

function AddForm(props) {
  const { carpetasData, setCarpetasData, addCarpetas } = props;

  return (
    <Form className="form-carpetas" onFinish={addCarpetas}>
     
          <Form.Item>
            <Input
              prefix={<FolderAddOutlined />}
              placeholder="Nombre"
              required={true}
              value={carpetasData.Nombre}
              minLength={4}
              onChange={(e) =>
                setCarpetasData({ ...carpetasData, Nombre: e.target.value })
              }
            />
          </Form.Item>
      
          <Form.Item>
            <TextArea 
            placeholder="Descripción" 
            value={carpetasData.Descripcion}
            required={true}
            minLength={5}
            onChange={ e => setCarpetasData({ ...carpetasData, Descripcion: e.target.value})}
            showCount maxLength={100}
            />
          </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="btn-submit">
          Crear Carpeta
        </Button>
      </Form.Item>
    </Form>
  );
}
