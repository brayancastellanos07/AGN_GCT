import React, { useState, useEffect } from "react";
import { getAccessToken } from "../../../api/auth";
import { getRolsApi } from "../../../api/rols";
import ListRols from "../../../components/admin/Rols/listRols/ListRols";
import { Spin } from "antd";

export default function Rols() {
  const [reloadRols, setReloadRols] = useState(false);
  const [listRols, setListRols] = useState([]);
  const token = getAccessToken();

  useEffect(() => {
    getRolsApi(token).then((response) => {
      setListRols(response.data);
    });

    setReloadRols(false);
  }, [reloadRols, token]);

  return (
    <div className="rols">
      {!listRols ? (
        <Spin
          tip="Cargando Carpetas"
          style={{ textAling: "center", width: "100%", padding: "20%" }}
        />
      ) : (
        <ListRols listRols={listRols} setReloadRols={setReloadRols} />
      )}
    </div>
  );
}
