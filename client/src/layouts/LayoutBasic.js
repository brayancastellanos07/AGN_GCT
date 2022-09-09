import React from "react";
import { Layout } from "antd";
import MenuTopWeb from"../components/Web/menuTopWeb";
import Footer from "../components/Web/footer/Footer";
import "./LayoutBasic.scss"; 



export default function LayoutBasic(props){
    // destructuring 
    const {children} = props;
    const {Header, Content} = Layout;

    return(
            <Layout className="layout">
                <Header>
                 <MenuTopWeb>
                    
                 </MenuTopWeb> 
                </Header>
                <Content>
                    {children}
                </Content>
                <Footer/>       
        </Layout>
    );
}