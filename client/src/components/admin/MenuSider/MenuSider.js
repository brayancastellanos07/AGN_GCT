import React from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../../../hooks";
import { Layout, Menu } from "antd";
import {
  FileTextOutlined,
  FolderOpenOutlined,
  SolutionOutlined,
  UserAddOutlined,
  FileAddOutlined,
  TableOutlined,
} from "@ant-design/icons";

import "./MenuSider.scss";

export default function MenuSider(props) {
  const { menuCollapsed, listCarpetas } = props;

  const { Sider } = Layout;

  const navigate = useNavigate();

  const { pathname } = useLocation();

  const {
    user: { rol },
  } = useAuth();

  const isSuperAdmin = rol === 1;

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
      >
        <Menu.SubMenu
          title={
            <>
              <FileTextOutlined /> 
              <span>Conceptos</span>
            </>
          }
        >
          {listCarpetas.map((data) => (
            <Menu.Item as={Link} key={`/admin/list-conceptos/${data.nombre}`}>
              <FileAddOutlined />
              <span>{data.nombre}</span>
            </Menu.Item>
          ))}

          <Menu.Item as={Link} key="/admin/carpetaslobby">
          <TableOutlined />
            <span>Listado de años</span>
          </Menu.Item>

        </Menu.SubMenu>
        <Menu.Item as={Link} key="/admin/list-carp">
          <FolderOpenOutlined />
          <span>Carpetas por año</span>
        </Menu.Item>
        {isSuperAdmin && (
          <>
            <Menu.Item as={Link} key="/admin/list-roles">
              <SolutionOutlined />
              <span>Definición de Roles</span>
            </Menu.Item>
            <Menu.Item as={Link} key="/admin/list-usuarios">
              <UserAddOutlined />
              <span>Usuarios</span>
            </Menu.Item>
          </>
        )}
      </Menu>
    </Sider>
  );
}
