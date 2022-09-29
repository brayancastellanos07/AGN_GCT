import { basePath } from "./config";

export function getRolsApi(token){
    const url = `${basePath}/list-rol`

    const params = {
        method: "GET",
        headers:{
            "Content-Type": "application/json",
            Authorization: token,
        },
    };

    return fetch(url, params)
    .then((response) =>{
        return response.json();
    })
    .then((result) =>{
        return result;
    })
    .catch((err =>{
        return err.message;
    }))
}

export function updateRolsApi(token, data, id){
    const url = `${basePath}/update-rol/${id}`;
    const params = {
        method: "PUT",
        headers:{
            "Content-Type":"application/json",
            Authorization: token,
        },
        body: JSON.stringify(data)
    }; 

    return fetch(url,params).then(response =>{
        return response.json();
    }).then(result =>{
       
       return result;
    }).catch(err=>{
        return err.message;
    })
}