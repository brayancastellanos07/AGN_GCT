import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Layout, Menu } from "antd";
import {
  FileTextOutlined,
  FolderOpenOutlined,
  IdcardOutlined,
  SolutionOutlined,
  UserAddOutlined,
} from "@ant-design/icons";

import "./MenuSider.scss";

export default function MenuSider(props) {
  const { menuCollapsed } = props;

  const { Sider } = Layout;

  const navigate = useNavigate();

  const {pathname} = useLocation(); 

  const menuItems = [
    {
      key: "/admin",
      icon: <FileTextOutlined />,
      label: <span className="nav-text">Conceptos</span>,
    },
    {
      key: "/admin/carpetas",
      icon: <FolderOpenOutlined />,
      label: <span className="nav-text">Carpetas por año</span>,
    },
    {
      key: "/admin/tipoDocumento",
      icon: <IdcardOutlined />,
      label: <span className="nav-text">Tipos de Documentos</span>,
    },
    {
      key: "/admin/roles",
      icon: <SolutionOutlined />,
      label: <span className="nav-text">Definición de Roles</span>,
    },
    {
      key: "/admin/list-usuarios",
      icon: <UserAddOutlined />,
      label: <span className="nav-text">Usuarios</span>,
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
        defaultSelectedKeys={pathname}
        onClick={menuClick}
        items={menuItems}
      ></Menu>
    </Sider>
  );
}
 
