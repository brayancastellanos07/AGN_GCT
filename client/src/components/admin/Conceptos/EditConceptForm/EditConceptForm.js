import React,{useState, useEffect} from "react";
import {Form, Input, Button, Row, Col,Select,Upload, DatePicker, notification} from "antd";
import { InboxOutlined } from "@ant-design/icons";
import "./EditConceptForm.scss";

const { TextArea } =  Input;

export default function EditConceptForm(props){
    const {data, setIsVisibleModal, setReloadConceptos} = props;
    const [conceptData, setConceptData]= useState({});

    useEffect(()=>{
        setConceptData({
            concepto: data.concepto,
            descripcion: data.descripcion,
            carpeta: data.carpeta,
            fecha: data.fecha
        });
    },[data]);
 

    const updateConceptos = e =>{

    }

    return (
        <div className="edit-concpetos-form">
            <EditConcept
            data={data}
            conceptData={conceptData}
            setConceptData={setConceptData}
            updateConceptos={updateConceptos}
            />
        </div>
    )
    
}

function EditConcept(props){
 const {conceptData, setConceptData, updateConceptos} = props;
 const { Option } = Select;
 return(
    <Form className="form-edit" on onFinish={updateConceptos} >
        <Row gutter={24}>
        <Col span={12}>
          <Form.Item>
            <Upload.Dragger name="files" action="/upload.do">
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Haga clic o arrastre el Concepto a esta área para cargarlo
              </p>
              <p className="ant-upload-hint">Support for a single upload.</p>
            </Upload.Dragger>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item>
            <TextArea
              placeholder="Descripción"
              value={conceptData.descripcion}
              minLength={5}
              onChange={() => console.log("aqui vamos")}
              showCount
              maxLength={100}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item>
            <Select
              placeholder="Carpeta"
              onChange={() => console.log("aqui vamos")}
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
        </Col>
        <Col span={12}>
          <Form.Item>
            <DatePicker />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="btn-submit">
          Actualziar Concepto
        </Button>
      </Form.Item>
    </Form>
 )
}