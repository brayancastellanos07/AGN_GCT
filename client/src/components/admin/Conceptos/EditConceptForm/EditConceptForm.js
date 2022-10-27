import React, { useState, useEffect, useCallback } from "react";
import { Form, Input, Button, Select, DatePicker } from "antd";
import moment from "moment";
import { useDropzone } from "react-dropzone";
import { getCarpetasMenuApi } from "../../../../api/carpetas";
import "./EditConceptForm.scss";
import { getConceptosByNameApi, getPdfApi } from "../../../../api/conceptos";
import { getAccessToken } from "../../../../api/auth";

const { TextArea } = Input;

export default function EditConceptForm(props) {
  const { data, setIsVisibleModal, setReloadConceptos } = props;
  const [conceptData, setConceptData] = useState({});
  const [pdf, setPdf] = useState(null);
  const [archivoName, setarchivoName] = useState(null);
  const token = getAccessToken();
  // carag los datos en el formulaario
  useEffect(() => {
    setConceptData({
      concepto: data.concepto,
      descripcion: data.descripcion,
      carpeta: data.carpeta,
      fecha: data.fecha,
    });
  }, [data]);

  // revisa si existe un concepto y lo carga
  useEffect(() => {
    if (data.archivo) {
      getPdfApi(data.archivo).then((response) => {
        setPdf(response);
      });
    } else {
      setPdf(null);
    }
  }, [data]);

  // si existe un archivo del concepto, obtiene la data del registro
  useEffect(() => {
    if (data.archivo) {
      getConceptosByNameApi(data.archivo, token).then((response) => {
        setarchivoName(response);
      });
    } else {
      setarchivoName(null);
    }
  }, [data, token]);

  // carag el archivo en la data
  useEffect(() => {
    if (pdf) {
      console.log("Ruta del archivo: ", pdf);
      setConceptData({ ...conceptData, archivo: pdf.file });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pdf]);

  const updateConceptos = (e) => {};

  // para cargar las carpetas en el select del formulario
  const [listCarpetas, setListCarpetas] = useState([]);
  useEffect(() => {
    getCarpetasMenuApi().then((response) => {
      setListCarpetas(response.data);
    });
  }, []);

  return (
    <div className="edit-concept-form">
      <UploadPdf
        pdf={pdf}
        setPdf={setPdf}
        archivoName={archivoName}
        setarchivoName={setarchivoName}
      />
      <EditConcept
        data={data}
        conceptData={conceptData}
        setConceptData={setConceptData}
        updateConceptos={updateConceptos}
        listCarpetas={listCarpetas}
      />
    </div>
  );
}

function UploadPdf(props) {
  const { pdf, setPdf, archivoName, setarchivoName } = props;
  const [pdfName, setPdfName] = useState(null);

  useEffect(() => {
    if (pdf) {
      setPdfName(archivoName);
      console.log("setPdfName", pdfName);
    } else {
      setPdfName(pdf);
    }
  }, [pdf,archivoName,pdfName]);
  // const getConcepto = () => {
  //   if (pdf) {
  //     const { file } = pdf;
  //     const name = file.path;
  //     return name;
  //   }
  //   return null;
  // };
  // const onDrop = useCallback(
  //   (acceptedFiles) => {
  //     const file = acceptedFiles[0];
  //     setPdf({ file, concepto: URL.createObjectURL(file) });
  //   },
  //   [setPdf]
  // );
  // const { getRootProps, getInputProps } = useDropzone({
  //   accept: { "image/pdf": [".pdf"] },
  //   onDrop,
  // });

  return (
    //   <div className="form-edit__miniature" {...getRootProps()}>
    //   <input {...getInputProps()} />
    //   {getConcepto() ? (
    //     <span>{getConcepto()}</span>
    //   ) : (
    //     <span>
    //       Haga clic o arrastre el archivo a esta área para cargarlo
    //     </span>
    //   )}
    // </div>
    <span>Hola</span>
  );
}

function EditConcept(props) {
  const {
    conceptData,

    setConceptData,
    updateConceptos,
    listCarpetas,
  } = props;
  const { Option } = Select;
  return (
    <Form className="form-edit" on onFinish={updateConceptos}>
      <Form.Item>
        <TextArea
          placeholder="Descripción"
          name="descripcion"
          showCount
          maxLength={100}
          value={conceptData.descripcion}
          onChange={(e) =>
            setConceptData({ ...conceptData, descripcion: e.target.value })
          }
        />
      </Form.Item>

      <Form.Item>
        <Select
          placeholder="Carpeta"
          name="carpeta"
          value={conceptData.carpeta}
          onChange={(e) => {
            setConceptData({ ...conceptData, carpeta: e });
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
            setConceptData({ ...conceptData, fecha: e });
          }}
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="btn-submit">
          Actualziar Concepto
        </Button>
      </Form.Item>
    </Form>
  );
}
