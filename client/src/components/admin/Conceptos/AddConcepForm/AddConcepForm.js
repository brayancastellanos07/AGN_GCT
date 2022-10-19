import React, { useCallback, useState } from "react";
import { Form, Input, Select, Button, DatePicker, Upload } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { useDropzone } from "react-dropzone";
import { createConcepApi } from "../../../../api/conceptos";
import { getAccessToken } from "../../../../api/auth";

import "./AddConcepForm.scss";

const { TextArea } = Input;
const { Dragger } = Upload;

export default function AddConcepForm(props) {
  const { setIsVisibleModal, setReloadConceptos } = props;
  const [concepData, setConcepData] = useState({});

  //para subir el pdf

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    console.log(file);
  });

  const { getRootProps, getInputProps } = useDropzone({
    accept: ".pdf",
    onDrop,
  });

  const getConcepto = () => {
    return null;
  };
  const AddConcep = (event) => {
    // let concepCreateData = concepData;
    // //console.log("Aqui esta la data", concepCreateData);
    // if (
    //   //!concepCreateData.concepto ||
    //   !concepCreateData.descripcion ||
    //   !concepCreateData.carpeta ||
    //   !concepCreateData.fecha
    // ) {
    //   notification["error"]({
    //     message: "Todos los campos son obligatorios",
    //   });
    // } else {
    //   const accesToken = getAccessToken();
    //   createConcepApi(accesToken, concepCreateData)
    //     .then((response) => {
    //       notification["success"]({
    //         message: response,
    //       });
    //       setIsVisibleModal(false);
    //       setReloadConceptos(true);
    //       setConcepData({});
    //     })
    //     .catch((err) => {
    //       notification["error"]({
    //         message: err,
    //       });
    //     });
    // }
  };
  return (
    <div className="add-concept-form">
      <AddForm
        conceptData={concepData}
        setConcepData={setConcepData}
        AddConcep={AddConcep}
        getConcepto={getConcepto}
        getRootProps={getRootProps}
        getInputProps={getInputProps}
      />
    </div>
  );
}

function AddForm(props) {
  const { conceptData, setConcepData, AddConcep, getRootProps, getInputProps } =
    props;
  const { Option } = Select;

  return (
    <Form className="form-add" onFinish={AddConcep}>
      <Form.Item>
        <div className="form-add__miniature" {...getRootProps()}>
          <input {...getInputProps()}/>
          <span>Haga clic o arrastre el archivo a esta área para cargarlo</span>
          
          {/* <Dragger >
            
             
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
            <p className="ant-upload-hint">
              Support for a single or bulk upload. Strictly prohibit from
              uploading company data or other band files
            </p>
          </Dragger> */}
        </div>
      </Form.Item>

      <Form.Item>
        <TextArea
          placeholder="Descripción"
          value={conceptData.descripcion}
          minLength={5}
          onChange={(e) =>
            setConcepData({ ...conceptData, descripcion: e.target.value })
          }
          showCount
          maxLength={100}
        />
      </Form.Item>

      <Form.Item>
        <Select
          placeholder="Carpeta"
          onChange={(e) => setConcepData({ ...conceptData, carpeta: e })}
          value={conceptData.carpeta}
        >
          <Option value="2013" name="2013">
            2013
          </Option>
          <Option value="2014" name="2014">
            2014
          </Option>
        </Select>
      </Form.Item>

      <Form.Item>
        <DatePicker
          onChange={(e) => setConcepData({ ...conceptData, fecha: e })}
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="btn-submit">
          Crear Concepto
        </Button>
      </Form.Item>
    </Form>
  );
}
