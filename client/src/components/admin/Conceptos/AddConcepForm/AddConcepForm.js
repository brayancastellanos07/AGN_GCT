import React, { useCallback, useState, useEffect } from "react";
import {
  Form,
  Input,
  Select,
  Button,
  DatePicker,
  notification
} from "antd";
import moment from 'moment';
import { useDropzone } from "react-dropzone";
import { createConcepApi } from "../../../../api/conceptos";
import { getAccessToken } from "../../../../api/auth";
import { getCarpetasMenuApi } from "../../../../api/carpetas";
import "./AddConcepForm.scss";
const { TextArea } = Input;

export default function AddConcepForm(props) {
  const { setIsVisibleModal, setReloadConceptos } = props;
  const [pdf, setPdf] = useState(null);
  const [concepData, setConcepData] = useState({});

  useEffect(() => {
    if (pdf) {
      setConcepData({ ...concepData, archivo: pdf.file });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pdf]);

  // para cargar las carpetas en el select del formulario
  const [listCarpetas, setListCarpetas] = useState([]);
  useEffect(() => {
    getCarpetasMenuApi().then((response) => {
      setListCarpetas(response.data);
    });
  }, []);

  // para realizar el envio de la data

  const CreateConcep = (e) => {
    const token = getAccessToken();
    let concepCreate = concepData;

    if (
      !concepCreate.descripcion ||
      !concepCreate.archivo ||
      !concepCreate.fecha ||
      !concepCreate.carpeta
    ) {
      notification["error"]({
        message: "Todos los campos son obligatorios. ",
      });
      return;
    }
    if (typeof concepCreate.archivo === "object") {
      console.log("dentro del create",concepCreate);
      createConcepApi(token, concepCreate).then((result) => {
        notification["success"]({
          message: result.message,
        });
        setReloadConceptos(true);
      });
    }
    setIsVisibleModal(false);
  };


  //para subir el pdf
  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      setPdf({ file, concepto: URL.createObjectURL(file) });
    },
    [setPdf]
  );

  const { getRootProps, getInputProps } = useDropzone({
    accept: {'image/pdf': ['.pdf']},
    onDrop,
  });

  const getConcepto = () => {
    if (pdf) {
      const { file } = pdf;
      const name = file.path;
      return name;
    }
    return null;
  };

  return (
    <div className="add-concept-form">
      <AddForm
        conceptData={concepData}
        setConcepData={setConcepData}
        getConcepto={getConcepto}
        getRootProps={getRootProps}
        getInputProps={getInputProps}
        listCarpetas={listCarpetas}
        CreateConcep={CreateConcep}
      />
    </div>
  );
}

function AddForm(props) {
  const {
    conceptData,
    setConcepData,
    getRootProps,
    getInputProps,
    getConcepto,
    listCarpetas,
    CreateConcep,
  } = props;
  const { Option } = Select;

  return (
    <Form className="form-add" onFinish={CreateConcep}>
      <Form.Item>
        <div className="form-add__miniature" {...getRootProps()}>
          <input {...getInputProps()} />
          {getConcepto() ? (
            <span>{getConcepto()}</span>
          ) : (
            <span>
              Haga clic o arrastre el archivo a esta área para cargarlo
            </span>
          )}
        </div>
      </Form.Item>

      <Form.Item>
        <TextArea
          placeholder="Descripción"
          name="descripcion"
          showCount
          maxLength={100}
          value={conceptData.descripcion}
          onChange={(e) =>
            setConcepData({ ...conceptData, descripcion: e.target.value })
          }
        />
      </Form.Item>

      <Form.Item>
        <Select
          placeholder="Carpeta"
          name="carpeta"
          onChange={(e) => {
            setConcepData({ ...conceptData, carpeta: e });
          }}
        >
          {listCarpetas.map((data) => (
            <Option key={data.id_carpeta} value={data.id_carpeta} name="2013">
              {data.nombre}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item>
        <DatePicker
        defaultValue={moment()}
          onChange={(e) => {
            setConcepData({ ...conceptData, fecha: e });
          }}
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
