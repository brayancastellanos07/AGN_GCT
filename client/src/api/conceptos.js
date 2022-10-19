import { basePath } from "./config";


//User Admin
export function getConcepbyCarpByNameAdminApi(token, nombre){
    const url = `${basePath}/Admin/list-conceptos/${nombre}`;
    const params = {
        method:"GET",
        headers:{
            "Content-Type":"application/json",
            Authorization: token,
        },
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
    })

}

export function createConcepApi(token, data){
    const url =  `${basePath}/create-concepto`;
    
    const params = {
        method: "POST",
        headers:{
            "Content-Type": "application/json",
            Authorization: token,
        },
        body: JSON.stringify(data),
    };
    return fetch(url, params)
    .then(( response)=>{
        return response.json();
    })
    .then((result)=>{
        return result.message;
    })
    .catch((err)=>{
        return err.message;
    });
}

export function deleteConceptApi(token, id_concepto){
    const url = `${basePath}/delete-conceptos/${id_concepto}`;

    const params = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization:  token,
        },
    };

    return fetch(url, params)
    .then((response)=>{
        return response.json();
    })
    .then((result)=>{
        return result.message;
    })
    .catch((err)=>{
        return err.message;
    })
}

// User Visit 
export function getConcepbyCarpByNameApi( nombre){
    const url = `${basePath}/list-conceptos/${nombre}`;
 
    const params={
        method: "GET",
        headers: {
            "Content-Type":"application/json",
          
        },
    };

    return fetch(url, params)
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