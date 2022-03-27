import React from "react";
import UserForm from "./UserForm"

export default function Login() {

  return(
    <div className="login__container">
      <UserForm
        title="Вход"
        button="Войти"
      />
    </div>
  )
}