import React from "react";
import { Button } from "antd";
import {
  MenuFoldOutlined,
  PoweroffOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import imagen from "../../../assets/img/png/logoagninicio.png";
import { logout } from "../../../api/auth";
import "./MenuTop.scss";

export default function MenuTop(props) {
  const { menuCollapsed, setMenuCollapsed } = props;
 
  const logoutUser = () => {
    logout();
    window.location.reload();
  };

  return (
    <div className="menu-top">
      <div className="menu-top__left">
        <img
          className="menu-top__left-logo"
          src={imagen}
          alt="Archivo General De La Nación"
        />
          <Button
            type="link"
            icon={menuCollapsed ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
            onClick={() => setMenuCollapsed(!menuCollapsed)}
          ></Button>
      </div>
      <div className="menu-top__right">
        <Button type="link" onClick={logoutUser}>
          <PoweroffOutlined />
        </Button>
      </div>
    </div>
  );
}
