import React from "react";
import { Button } from "antd";
import {
  MenuFoldOutlined,
  PoweroffOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import imagen from "../../../assets/img/png/logoagninicio.png";
import "./menuTopWeb.scss";



export default function menutopWeb(props) {
  const { menuCollapsed, setMenuCollapsed } = props;
  return (
   <div className="menu-top-web">
    <div className="menu-top-web__left">
      <img
      className="menu-top-web__left-logo"
      src={imagen}
      alt="Archivo General De La Nación"
      />
      <Button
      type="link"
      icon={menuCollapsed}
      >

      </Button>
    </div>

   </div>
    
  )
}
