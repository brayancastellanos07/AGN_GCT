import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Layout, Menu } from "antd";
import {
  FileTextOutlined,
  FolderOpenOutlined,
  SolutionOutlined,
  UserAddOutlined,
  FileAddOutlined 
} from "@ant-design/icons";

import "./MenuSider.scss";

export default function MenuSider(props) {
  const { menuCollapsed,listCarpetas } = props;

  const { Sider } = Layout;

  const navigate = useNavigate();

  const {pathname} = useLocation(); 

  console.log(listCarpetas)
  
  const menuItems = [
    {
      key: "/admin/list-conceptos",
      icon: <FileTextOutlined />,
      label: <span className="nav-text">Conceptos</span>,
      children:[
        {
          key: "/admin/list-conceptos/2013",
          icon: <FileAddOutlined />,
          label: <span className="nav-text">{`${listCarpetas}`}</span>,
        },
        {
          key: "/admin/list-conceptos/2014",
          icon: <FileAddOutlined />,
          label: <span className="nav-text">2014</span>,
        },
      ],
    },
    {
      key: "/admin/list-carp",
      icon: <FolderOpenOutlined />,
      label: <span className="nav-text">Carpetas por año</span>,
    },
    {
      key: "/admin/list-roles",
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
 
