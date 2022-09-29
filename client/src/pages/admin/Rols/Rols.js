import React, {useState, useEffect} from "react";
import { getAccessToken } from "../../../api/auth";
import { getRolsApi } from "../../../api/rols";
import ListRols from "../../../components/admin/Rols/listRols/ListRols";

export default function Rols(){
    const [reloadRols, setReloadRols] = useState(false);
    const [listRols, setListRols] = useState([]);
    const token = getAccessToken();

    useEffect(() => {
        
        getRolsApi(token).then(response =>{
            setListRols(response.data);
        });


        setReloadRols(false);
    },[reloadRols, token]);

    return(
        <div className="rols">
            <ListRols listRols={listRols} setReloadRols={setReloadRols}/>
        </div>
    )
}