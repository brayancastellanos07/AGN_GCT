import React from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { Layout, Menu } from "antd";

import {
  FileTextOutlined,
  FileAddOutlined,
  TableOutlined,
} from "@ant-design/icons";
import "./menuSiderWeb.scss";

export default function MenuSiderWeb(props) {
  const { menuCollapsed, listCarpetas } = props;
  const { Sider } = Layout;
  const navigate = useNavigate();
  const { pathname } = useLocation();

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
            <Menu.Item as={Link} key={`/list-conceptos/${data.nombre}`}>
              <FileAddOutlined />
              <span>{data.nombre}</span>
            </Menu.Item>
          ))}
        </Menu.SubMenu>
        <Menu.Item as={Link} key="/">
          <TableOutlined />
          <span>Listado de años</span>
        </Menu.Item>
      </Menu>
    </Sider>
  );
}
