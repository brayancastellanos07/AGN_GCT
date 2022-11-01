import { basePath } from "./config";

//User Admin
// obtiene el concepto segun la carpeta
export function getConcepbyCarpByNameAdminApi(token, nombre) {
  const url = `${basePath}/Admin/list-conceptos/${nombre}`;
  const params = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  };
  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err.message;
    });
}
// almacena el pdf y crea el registro en la base de datos
export function createConcepApi(token, data) {
  const url = `${basePath}/create-concepto`;
  const formData = new FormData();
  
  Object.keys(data).forEach((key) => {
    formData.append(key, data[key]);
  });

  if (!data.archivo) {
    formData.append("archivo", data.archivo);
  }

  const params = {
    method: "POST",
    headers: {
      // "Content-Type": "application/json",
      Authorization: token,
    },
    body: formData,
  };
  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result.message;
    })
    .catch((err) => {
      return err.message;
    });
}
// Elimina el registro de la base de datos y el archivo pdf
export function deleteConceptApi(token, id_concepto) {
  const url = `${basePath}/delete-conceptos/${id_concepto}`;

  const params = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  };

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result.message;
    })
    .catch((err) => {
      return err.message;
    });
}
// obtiene el archivo pdf
export function getPdfApi(pdfName) {
  const url = `${basePath}/get-pdfs/${pdfName}`;

  return fetch(url)
    .then((response) => {
      return response.url;
    })
    .catch((err) => {
      return err.message;
    });
}

// actualizacion del archivo pdf
export function updatePdfApi(token,archivo, id){
  const url = `${basePath}/update-pdf/${id}`;

  const formData =  new FormData();
  
  formData.append("archivo", archivo );

  const params = {
    method: "PUT",
    body: formData,
    headers:{
      Authorization: token,
    }
  };

  return fetch(url,params)
  .then((response)=>{
    return response.json();
  })
  .then((result)=>{
    return result;
  })
  .catch((err)=>{
    return err.message;
  });
}

export function updateConceptApi(token,data,id){
  const url = `${basePath}/update-conceptos/${id}`;

  const params = {
    method: "PUT",
    headers:{
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(data),
  };

  return fetch(url, params)
  .then((response)=>{
    return response.json();
  })
  .then((result)=>{
    return result;
  })
  .catch((err) =>{
    return err.message;
  });
}
// User Visit
export function getConcepbyCarpByNameApi(nombre) {
  const url = `${basePath}/list-conceptos/${nombre}`;

  const params = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err.message;
    });
}
