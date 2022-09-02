import React from "react";
import { Form, Input, Button } from "antd";
import { UserOutlined,LockOutlined } from "@ant-design/icons";
import "./LoginForm.scss";

export default function LoginForm() {
  return (
    <Form className="register-form">
      {/*Label   */}
      <Form.Item
        className="register-form__Item-label"
        label="Correo Electronico"
      ></Form.Item>
      {/*Imput Correo  */}
      <Form.Item className="register-form__Item-input">
        <Input
          prefix={<UserOutlined />}
          type="email"
          name="email"
          placeholder="Correo electronico"
          className="register-form__input"
        />
      </Form.Item>
      {/*label contraseña */}
      <Form.Item className="register-form__Item-label" label="Contraseña">
        {" "}
      </Form.Item>
      {/* Input Contraseña*/}
      <Form.Item className="register-form__Item-input">
        <Input
          prefix={<LockOutlined/>}
          type="password"
          name="password"
          placeholder="Contraseña"
          className="register-form__input"
        />
      </Form.Item>
      {/* Boton Ingresar */}
      <Form.Item>
        <Button htmlType="submit" className="register-form__button">
          Ingresar
        </Button>
      </Form.Item>
    </Form>
  );
}
