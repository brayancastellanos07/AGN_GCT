import React from "react";
import { Layout } from "antd";
import "./LayoutBasic.scss"; 



export default function LayoutBasic(props){
    // destructuring 
    const {children} = props;
    const {Header, Content, Footer} = Layout;

    return(
        <Layout>
            <h2>Menu Sider basic</h2>
            <Layout>
                <Header>
                    Desde pagina usuario normal 
                </Header>
                <Content>
                    {children}
                </Content>
                <Footer>
                    Archivo General De La Nación
                </Footer>
            </Layout>
            
        </Layout>
    );
}