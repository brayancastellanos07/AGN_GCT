import React, { useEffect, useState } from "react";
import { Layout } from "antd";
import MenuTop from "../components/admin/MenuTop";
import MenuSider from "../components/admin/MenuSider";
import AdminSingIn from "../pages/admin/SingIn";
import useAuth from "../hooks/useAuth";
import "./LayoutAdmin.scss";
import { getCarpetasMenuApi } from "../api/carpetas";
 
//import { Routes } from "react-router-dom";

export default function LayoutAdmin(props) {
  // destructuring
  const { children } = props;
  const [menuCollapsed, setMenuCollapsed] = useState(false);
  const { Header, Content, Footer } = Layout;
  const {user, isLoading} = useAuth();
  const [listCarpetas, setListCarpetas] = useState([]);
  // useEffect(()=>{
  //   getCarpetasMenuApi().then(response =>{
  //     setListCarpetas(response.data)
  //   });
  // });

 
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
        <MenuSider listCarpetas={listCarpetas}  menuCollapsed={menuCollapsed} />
        <Layout
          className="layout-admin"
          style={{ marginLeft: menuCollapsed ? "90px" : "200px" }}
        >
          <Header className="layout-admin__header">
            <MenuTop
              menuCollapsed={menuCollapsed}
              setMenuCollapsed={setMenuCollapsed}
            />
          </Header>
          <Content className="layout-admin__content">{children}</Content>
          <Footer className="layout-admin__footer">Brayan Castellanos 24</Footer>
        </Layout>
      </Layout>
    );
  }
 return null;
}
