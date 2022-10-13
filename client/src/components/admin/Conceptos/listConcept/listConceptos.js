import { Table, List, Button, Modal as ModalAntd, notification  } from "antd";
import React from "react";
import { useParams } from "react-router-dom";
import Modal from "../../../modal/Modal";
import {v4 as uuid} from"uuid";
import {
  EditOutlined,
  DeleteOutlined,
  FolderOutlined,
  FolderAddOutlined,
} from "@ant-design/icons";


export default function LisConceptos(props) {
  const { listConceptos, setReloadConceptos } = props;
  const { nombre } = useParams();
  const keyMap = listConceptos.map((id_concepto)=>({...id_concepto}))
  console.log("aqui",keyMap)
  const colums=[
    {
        title:"Nombre", 
        dataIndex:"nombre",
        key: 'nombre',
    }, 
    {
        title:"Descripción",
        dataIndex: "descripcion",
        key:'descripcion'
    },
    {
        title:"Carpeta",
        dataIndex: "carpeta",
        key:'carpeta'
    }
    ,
    {
        title:"Archivo",
        dataIndex: "archivo",
        key:'archivo'
    }
    ,
    {
        title:"Fecha",
        dataIndex: "fecha",
        key:'fecha'
    }
]
  return (
    <div className="list-conceptios">
      <div className="list-conceptos__header">
        <h2 className="list-conceptos__header__h2">
          {`Conceptos del año ${nombre}`}
        </h2>
        <Button
          type="primary"
          icon={<FolderAddOutlined />}
          onClick={() => console.log("Aqui vamos")}
        >
          Nuevo Concepto
        </Button>
      </div>
      < Table columns={colums} dataSource={listConceptos} rowKey={uuid()}  />
      {/* <List
      className="conceptos"
      itemLayout="horizontal"
      dataSource={listConceptos}
      renderItem={(data) => (
        <ListConceptosAdmin
        data={data}
        setReloadConceptos={setReloadConceptos}
       />
        )}
        /> */}
      
      <Modal
        // title={modalTitle}
        // isVisible={isVisibleModal}
        // setIsVisible={setIsVisibleModal}
      >
        {/* {modalContent} */}
      </Modal>
    </div>
  );
}

function ListConceptosAdmin(props) {
    const {data, setReloadConceptos} = props;
   
  return(
    <List.Item
    actions={[
        <Button type="primary" onClick={()=> console.log("Funciona")}>
            <EditOutlined />
        </Button>,
        <Button type="danger" onClick={()=> console.log("vamos melos")}>
            <DeleteOutlined />
        </Button>
    ]}
    > 
    <List.Item.Meta 
     title={`Concepto: ${data.nombre}`}
     description={`Carpeta: ${data.carpeta}
    
     Archivo:  ${data.archivo} 

     Fecha: ${data.fecha}
     
     Descripción: ${data.descripcion}
     `}
    />
    </List.Item>
  );
}
