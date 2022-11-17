import React, { useState, useEffect } from "react";
import { getAccessToken } from "../../../api/auth";
import { getCarpetasApi } from "../../../api/carpetas";
import ListCarpetas from "../../../components/admin/Carpetas/listCarpetas/ListCarpetas";
import { Spin } from "antd";

export default function Carpetas() {
  const [reloadCarpetas, setReloadCarpetas] = useState(false);
  const [listCarpetas, setListCarpetas] = useState([]);
  const token = getAccessToken();

  useEffect(() => {
    getCarpetasApi(token).then((response) => {
      setListCarpetas(response.data);
    });

    setReloadCarpetas(false);
  }, [reloadCarpetas, token]);

  return (
    <div className="carpetas">
      {!listCarpetas ? (
        <Spin
          tip="Cargando Carpetas"
          style={{ textAling: "center", width: "100%", padding: "20%" }}
        />
      ) : (
        <ListCarpetas
          listCarpetas={listCarpetas}
          setReloadCarpetas={setReloadCarpetas}
        />
      )}
    </div>
  );
}
