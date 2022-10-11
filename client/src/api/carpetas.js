import { basePath } from "./config";

export function getCarpetasApi(token){
    const url = `${basePath}/list-carp`;

    const params = {
        method:  "GET",
        headers: {
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
    });

}

export function getCarpetasHomeApi(){
    const url = `${basePath}/list-carp-home`;


    return fetch(url)
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
// revisar si se esta usando en el menu 
export function getCarpetasMenuApi(){
    const url = `${basePath}/list-carp-menu`;

    const params = {
        method:  "GET",
        headers: {
            "Content-Type":"application/json",
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
    });

}

export function createCarpetasApi(token, data){
    const url = `${basePath}/create-carp`;

    const params = {
        method: "POST",
        headers:{
            "Content-Type":"application/json",
            Authorization: token,
        },
        body: JSON.stringify(data),
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
    });
}

export function deleteCarpetasApi(token, id_carpeta){

    const url = `${basePath}/delete-carp/${id_carpeta}`;
    
    const params = {
        method: "DELETE",
        headers:{
            "Content-Type":"application/json",
            Authorization: token, 
        },
    }; 

    return fetch(url, params)
    .then((response) =>{
        return response.json(); 
    })
    .then((result)=> {
        return result.message;
    })
    .catch((err)=>{
        return err.message;
    });
}

export function updateCarpetasApi(token, data, id){
    const url = `${basePath}/update-carp/${id}`;

    const params ={
        method: "PUT",
        headers:{
            "Content-Type":"application/json",
            Authorization: token,
        },
        body:JSON.stringify(data),
    };

    return fetch(url,params).then(response=>{
        return response.json();
    }).then(result =>{
        return result;
    }).catch(err =>{
        return err.message;
    })

}