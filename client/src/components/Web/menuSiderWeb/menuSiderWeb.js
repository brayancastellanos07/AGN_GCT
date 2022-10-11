import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Layout, Menu, notification } from "antd";
import { FileTextOutlined, FolderOpenOutlined } from "@ant-design/icons";
import {getCarpetasMenuApi} from"../../../api/carpetas";

import "./menuSiderWeb.scss";

export default function MenuSiderWeb(props) {
  const { menuCollapsed } = props;
  const { Sider } = Layout;
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(()=>{
    getCarpetasMenuApi()
    .then((response)=>{
      if(!response.data){
        notification["warning"]({
          message:response.message,
        });
      }else{
        setData(response.data);
      }
    })
    .catch(()=>{
      notification["error"]({
        message:"Error del servidor intentelo mas tarde."
      });
    });
  },[]);
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
