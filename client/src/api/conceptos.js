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