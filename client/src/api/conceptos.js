import { basePath } from "./config";

export function getConcepbyCarpByNameApi(token, nombre){
    const url = `${basePath}/list-conceptos/${nombre}`;
 
    const params={
        method: "GET",
        headers: {
            "Content-Type":"application/json",
            Authorization: token,
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