import React, { useState } from "react";
import { Form, Input, Button, notification } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { LoginApi } from "../../../api/user";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../../utils/constants";

import "./LoginForm.scss";

export default function LoginForm() {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const changeForm = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const login = async (e) => {
    const result = await LoginApi(inputs);

    if (result.message) {
      notification["error"]({
      message: result.message,
       
      });
     
    } else {
      const { accessToken, refreshToken } = result;
      localStorage.setItem(ACCESS_TOKEN, accessToken);
      localStorage.setItem(REFRESH_TOKEN,refreshToken);
      notification["success"]({
        message: "Login correcto. "
      });

      window.location.href = "/admin";
    }
  };

  return (
    <Form
      className="register-form"
      onChange={changeForm}
      onSubmitCapture={login}
    >
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
          prefix={<LockOutlined />}
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
