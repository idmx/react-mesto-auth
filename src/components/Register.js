import React from "react";
import UserForm from "./UserForm"
import { NavLink, useHistory } from "react-router-dom";

export default function Register( props ) {

  const history = useHistory();

  //Если пользователь залогинен, он будет перенаправлен
  React.useEffect(() => {
    props.loggedIn && history.push( '/' )
  }, [ props.loggedIn ])

  return(
    <div className="register__container">
      <UserForm
        title="Регистрация"
        button="Зарегистрироваться"
        signClick={ props.signUpClick }
      >
        <p className="register__yet">
          Уже зарегистрированы?
          <NavLink className="register__login-link" to="/sign-in"> Войти</NavLink>
        </p>
      </UserForm>
    </div>
  )
}