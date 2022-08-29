import React from "react";
import { useNavigate } from "react-router-dom";
import { Layout, Menu } from "antd";
import { HomeOutlined, MenuOutlined } from "@ant-design/icons";

import "./MenuSider.scss";

export default function MenuSider(props) {

  const { menuCollapsed } = props;

  const { Sider } = Layout;

  const navigate = useNavigate();

  const menuItems = [
    {
      key: "/admin",
      icon: <HomeOutlined />,
      label: <span className="nav-text">Home</span>,
    },
    {
      key: "/admin/menu-web",
      icon: <MenuOutlined />,
      label: <span className="nav-text">Menu Web</span>,
    },
  ];

  const menuClick = (e) => {
    const path = e.key;
    navigate(path);
  };

  
  return (
    <Sider className="admin-sider" collapsed={menuCollapsed}>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["1"]}
        onClick={menuClick}
        items={menuItems}
      ></Menu>
    </Sider>
  );
}
