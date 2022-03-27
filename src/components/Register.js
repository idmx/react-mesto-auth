import React from "react";
import UserForm from "./UserForm"
import { NavLink } from "react-router-dom";

export default function Register( props ) {

  return(
    <div className="register__container">
      <UserForm
        title="Регистрация"
        button="Зарегистрироваться"
        singUpClick={ props.singUpClick }
      >
        <p className="register__yet">
          Уже зарегистрированы?
          <NavLink className="register__login-link" to="/sign-in"> Войти</NavLink>
        </p>
      </UserForm>
    </div>
  )
}