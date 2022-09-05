import React from "react";
import {Layout, Tabs} from 'antd';
import Logo from "../../../assets/img/png/Logo_login_1.png";
import LoginForm from "../../../components/admin/LoginForm";

import './SingIn.scss';

export default function SingIn(){
    const {Content} = Layout;
    const {TabPane} = Tabs;
    return(
        <Layout className="Sing-in">
            <Content className="Sing-in__Content">
                <h1 className="Sing-in__Content-logo">
                  <img src={Logo} alt="Archivo General de la Nación"/>
                </h1>
                <div className="Sing-in__Content-tabs">
                    <Tabs type="card">
                        <TabPane tab={<span>Ingresar</span>} key="1">
                        <LoginForm/>
                        </TabPane>
                    </Tabs>
                </div>
            </Content>
        </Layout> 
    
    );
}