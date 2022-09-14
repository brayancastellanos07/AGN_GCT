import React from "react";
import { useNavigate } from "react-router-dom";
import { Layout, Menu } from "antd";
import { FileTextOutlined, FolderOpenOutlined } from "@ant-design/icons";

import "./menuSiderWeb.scss";

export default function MenuSiderWeb(props) {
  const { menuCollapsed } = props;
  const { Sider } = Layout;

  const navigat = useNavigate();

  const menuItems = [
    {
      key: "/",
      icon: <FolderOpenOutlined />,
      label: <span className="nav-text">Conceptos</span>,
      children: [
        {
          key: "/",
          icon: <FileTextOutlined />,
          label: <span className="nav-text">2013</span>,
        },
        {
          key: "/",
          icon: <FileTextOutlined />,
          label: <span className="nav-text">2014</span>,
        },
      ],
    },
  ];

  const menuClick = (e) => {
    const path = e.key;
    navigat(path);
  };

  return (
    <Sider className="basic-sider" collapsed={menuCollapsed}>
      <Menu
        theme="dark"
        mode="inline"
        defaultOpenKeys={["1"]}
        onClick={menuClick}
        items={menuItems}
      ></Menu>
    </Sider>
  );
}
