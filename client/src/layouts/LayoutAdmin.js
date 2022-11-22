import React, { useEffect, useState } from "react";
import { Layout } from "antd";
import MenuTop from "../components/admin/MenuTop";
import MenuSider from "../components/admin/MenuSider";
import AdminSingIn from "../pages/admin/SingIn";
import {useAuth} from "../hooks";
import "./LayoutAdmin.scss";
import { getCarpetasMenuApi } from "../api/carpetas";
 
//import { Routes } from "react-router-dom";

export default function LayoutAdmin(props) {
  // destructuring
 
  const { children } = props;
  const [menuCollapsed, setMenuCollapsed] = useState(false);
  const { Header, Content } = Layout;
  const {user, isLoading} = useAuth();
  const [reloadCarpetas, setReloadCarpetas] = useState(false);
  const [listCarpetas, setListCarpetas] = useState([]);

  const [cambioPantalla, setcambioPantalla] =  useState(false);

  useEffect(()=>{
    getCarpetasMenuApi().then(response =>{
      setListCarpetas(response.data)
    });
    setReloadCarpetas(false);
  },[reloadCarpetas]);

  // para bloquear el boton del menu, terminar
  useEffect(() => {
    if (window.innerWidth <= 1024) {
     setcambioPantalla(true);
    }else{
      setcambioPantalla(false);
    }
  },[setcambioPantalla]);


 
  if (!user && !isLoading) {
    return (
      <>
        <AdminSingIn />
      </>
    );
  }


  if (user && !isLoading) {
    return (
      <Layout>
        <MenuSider listCarpetas={listCarpetas}  menuCollapsed={ !cambioPantalla ? (menuCollapsed):(true)  } />
        <Layout
          className="layout-admin"       
          style={  !cambioPantalla ?  ({ marginLeft: menuCollapsed ? "90px" : "200px" }):({ marginLeft: menuCollapsed ? "90px" : "90px" })   }
        >
          <Header className="layout-admin__header">
            <MenuTop
              menuCollapsed={menuCollapsed}
              setMenuCollapsed={setMenuCollapsed}
            />
          </Header>
          <Content className="layout-admin__content">{children}</Content>
          {/* <Footer className="layout-admin__footer">Brayan Castellanos 24</Footer> */}
        </Layout>
      </Layout>
    );
  }
 return null;
}
