import React, { useState, useEffect, useCallback } from "react";
import { Form, Input, Button, Select, DatePicker, notification } from "antd";
import moment from "moment";
import { useDropzone } from "react-dropzone";
import { getCarpetasMenuApi } from "../../../../api/carpetas";
import "./EditConceptForm.scss";
import {
  getPdfApi,
  getPdfById,
  updatePdfApi,
  updateConceptApi,
} from "../../../../api/conceptos";
import { getAccessToken } from "../../../../api/auth";

const { TextArea } = Input;

export default function EditConceptForm(props) {
  const { data, setIsVisibleModal, setReloadConceptos } = props;
  const [conceptData, setConceptData] = useState({});
  const [archivoPdf, setarchivoPdf] = useState({});
  const [pdf, setPdf] = useState(null);
  const token = getAccessToken();
  // carag los datos en el formulaario
  useEffect(() => {
    setConceptData({
      id: data.id_concepto,
      descripcion: data.descripcion,
      carpeta: data.carpeta,
      fecha: data.fecha,
      nombre: data.nombre,
    });
  }, [data]);


  // revisa si existe un concepto y lo carga
  useEffect(() => {
    getPdfById(token, data.id_concepto).then((response) => {
      setarchivoPdf(data);
    });
  }, [token, data]);

  useEffect(() => {
    if (archivoPdf.archivo) {
      getPdfApi(archivoPdf.archivo).then((response) => {
        setPdf(response);
      });
    } else {
      setPdf(null);
    }
  }, [archivoPdf.archivo]);

  // carag el archivo en la data
  useEffect(() => {
    if (pdf) {
      setConceptData({ ...conceptData, archivo: pdf.file });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pdf]);

  const updateConceptos = (e) => {
    let conceptUpdate = conceptData;
    if (conceptData.carpeta === data.carpeta) {
      console.log(data.id_carpeta)
      if (!data.id_carpeta) {
        notification["warning"]({
          message: "Rectifique la carpeta donde se almacenarÃ¡ el concepto. ",
        });
        return;
      }
      conceptUpdate.carpeta = data.id_carpeta;

      console.log(conceptUpdate.carpeta);
    }

    if (
      !conceptUpdate.descripcion ||
      !conceptUpdate.fecha ||
      !conceptUpdate.carpeta
    ) {
      notification["error"]({
        message: "Todos los campos son obligatorios. ",
      });
      return;
    }
    if (typeof conceptUpdate.archivo === "object") {
      updatePdfApi(token, conceptUpdate.archivo, conceptData.id).then(
        (response) => {
          notification["error"]({
            message: response.message,
          });
          conceptUpdate.nombre = response.nombre;

          updateConceptApi(token, conceptUpdate, conceptData.id).then(
            (result) => {
              notification["success"]({
                message: result.message,
              });
              setReloadConceptos(true);
            }
          );
          setReloadConceptos(true);
        }
      );
    } else {
      updateConceptApi(token, conceptUpdate, conceptData.id).then((result) => {
        notification["success"]({
          message: result.message,
        });
        setReloadConceptos(true);
      });
    }
    setIsVisibleModal(false);
  };

  // para cargar las carpetas en el select del formulario
  const [listCarpetas, setListCarpetas] = useState([]);
  useEffect(() => {
    getCarpetasMenuApi().then((response) => {
      setListCarpetas(response.data);
    });
  }, []);
  return (
    <div className="edit-concept-form">
      <UploadPdf pdf={pdf} setPdf={setPdf} conceptData={conceptData} />
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
  const { pdf, setPdf, conceptData } = props;
  const [pdfName, setPdfNew] = useState(null);

  const getConceptName = () => {
    if (pdf) {
      const { file } = pdf;
      const { name } = file;
      const nombre = name;
      return nombre;
    }

    return null;
  };

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      setPdf({ file, concepto: URL.createObjectURL(file) });
      setPdfNew({ file, concepto: URL.createObjectURL(file) });
    },
    [setPdf]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/pdf": [".pdf"] },
    noKeyboard: true,
    onDrop,
  });

  return (
    <div className="form-edit__miniature" {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <span>Haga clic o arrastre el archivo a esta Ã¡rea para cargarlo </span>
      ) : (
        <span>{!pdfName ? conceptData.nombre : getConceptName()}</span>
      )}
    </div>
  );
}

function EditConcept(props) {
  const { conceptData, setConceptData, updateConceptos, listCarpetas, data } =
    props;
  const { Option } = Select;

  return (
    <Form className="form-edit" on onFinish={updateConceptos}>
      <Form.Item>
        <TextArea
          placeholder="DescripciÃ³n"
          name="descripcion"
          showCount
          required={true}
          maxLength={1000}
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
          status="warning"
          value={data.carpeta}
          onChange={(e) => {
            setConceptData({ ...conceptData, carpeta: e });
          }}
        >
          {listCarpetas.map((data) => (
            <Option key={data.id_carpeta} value={data.id_carpeta}>
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
