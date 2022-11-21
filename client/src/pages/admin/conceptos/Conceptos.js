import React, { useState, useEffect } from "react";
import { getAccessToken } from "../../../api/auth";
import { getConcepbyCarpByNameAdminApi } from "../../../api/conceptos";
import { useParams } from "react-router-dom";
import ListConceptos from "../../../components/admin/Conceptos/listConcept";


export default function ConceptosAdmin() {
  const [reloadConceptos, setReloadConceptos] = useState(false);
  const [listConceptos, setListConceptos] = useState([]);
  const token = getAccessToken();
  const { nombre } = useParams(); 

  useEffect(() => {
    getConcepbyCarpByNameAdminApi(token, nombre).then((response) => {
      setListConceptos(response.data);
    });
    setReloadConceptos(false);
  }, [reloadConceptos, token, nombre]);
  return (
    <div className="conceptos">
     
        <ListConceptos
          listConceptos={listConceptos}
          setReloadConceptos={setReloadConceptos}
        />
    
    </div>
  );
}
