import React, { useEffect, useState } from "react";
import { Layout } from "antd";
import MenuSiderWeb from "../components/Web/menuSiderWeb";
import MenuTopWeb from "../components/Web/menuTopWeb";
import { getCarpetasMenuApi } from "../api/carpetas";
import FooterWeb from "../components/Web/footer";
import "./LayoutBasic.scss";

export default function LayoutBasic(props) {
  const { children } = props;
  const [menuCollapsed, setMenuCollapsed] = useState(false);
  const { Header, Content, Footer } = Layout;
  const [reloadCarpetas, setReloadCarpetas] = useState(false);
  const [listCarpetas, setListCarpetas] = useState([]);
  useEffect(() => {
    getCarpetasMenuApi().then((response) => {
      setListCarpetas(response.data);
    });
    setReloadCarpetas(false);
  }, [reloadCarpetas]);

  return (
    <Layout>
      <MenuSiderWeb listCarpetas={listCarpetas} menuCollapsed={menuCollapsed} />
      <Layout
        className="layout-basic"
        style={{ marginLeft: menuCollapsed ? "90px" : "200px" }}
      >
        <Header className="layout-basic__header">
          <MenuTopWeb
            menuCollapsed={menuCollapsed}
            setMenuCollapsed={setMenuCollapsed}
          />
        </Header>
        <Content className="layout-basic__content">{children}</Content>
        <Footer className="layout-basic__footer">
          <FooterWeb />
        </Footer>
      </Layout>
    </Layout>
  );
}
