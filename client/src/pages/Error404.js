import React from "react";
import {Layout} from 'antd';
import error404 from "../assets/img/jpg/error404.jpg"
import './Error404.scss';
export default function Error404(){
    const {Content} = Layout;
    return(
        <Content className="Sing-in__Content">
        <img className="Sing-in__Content-img" src={error404} alt="Archivo General de la Nación" />
        </Content>
    );
}