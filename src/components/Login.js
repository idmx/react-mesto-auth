import React from "react";
import { useHistory } from "react-router-dom";
import UserForm from "./UserForm"

export default function Login( props ) {
  const history = useHistory()

  //Если пользователь залогинен, он будет перенаправлен
  React.useEffect(() => {
    props.loggedIn && history.push( '/' )
  }, [ props.loggedIn ])

  function signClick( email, password ) {
    props.signInClick( email, password, history );
  }

  return(
    <div className="login__container">
      <UserForm
        title="Вход"
        button="Войти"
        signClick={ signClick }
      />
    </div>
  )
}