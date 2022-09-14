import React, {useState} from "react";
import { Layout } from "antd";
import MenuSiderWeb from "../components/Web/menuSiderWeb"
import MenuTopWeb from "../components/Web/menuTopWeb";
import FooterwEB from "../components/Web/footer/Footer";
import "./LayoutBasic.scss";

export default function LayoutBasic(props) {
  const { children } = props;
  const [menuCollapsed, setMenuCollapsed] = useState(false);
  const { Header, Content,Footer } = Layout;

  return (
    
    <Layout>
      <MenuSiderWeb menuCollapsed={menuCollapsed}/>
      <Layout 
      className="layout-basic"
      style={{marginLeft: menuCollapsed ? "90px" : "200px"}}
      >
      <Header className="layout-basic__header">
        
      </Header>
      <Content>
        
      </Content>
      <Footer></Footer>
      </Layout>
    </Layout>
  );
}
