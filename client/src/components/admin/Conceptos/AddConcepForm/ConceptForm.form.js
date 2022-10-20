import * as Yup from "yup";

export function initialValues() {
    return {
      descripcion: "",
      archivo: "",
      fecha: "",
      carpeta: "",
    };
  }

  export function validationSchema() {
    return Yup.object({
      descripcion: Yup.string().required(true),
      archivo: Yup.string().required(true),
      fecha: Yup.string().required(true),
      carpeta: Yup.string().required(true),

    });
  }