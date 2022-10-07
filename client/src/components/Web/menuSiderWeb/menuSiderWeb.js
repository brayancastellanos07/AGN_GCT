import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Layout, Menu } from "antd";
import { FileTextOutlined, FolderOpenOutlined } from "@ant-design/icons";

import "./menuSiderWeb.scss";

export default function MenuSiderWeb(props) {
  const { menuCollapsed } = props;
  const { Sider } = Layout;

  const navigate = useNavigate();

  const { pathname } = useLocation();

  const menuItems = [
    {
      key: "",
      icon: <FolderOpenOutlined />,
      label: <span className="nav-text">Conceptos</span>,
      children: [
        {
          key: "/1",
          icon: <FileTextOutlined />,
          label: <span className="nav-text">2013</span>,
        },
        {
          key: "/2",
          icon: <FileTextOutlined />,
          label: <span className="nav-text">2014</span>,
        },
      ],
    }
  ];

  const menuClick = (e) => {
    const path = e.key;
    navigate(path);
  };

  return (
    <Sider className="basic-sider" collapsed={menuCollapsed}>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={pathname}
        onClick={menuClick}
        items={menuItems}
      ></Menu>
    </Sider>
  );
}
