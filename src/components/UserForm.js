import React from "react";

export default function UserForm( props ) {
  const [ email, setEmail ] = React.useState("");
  const [ password, setPassword ] = React.useState("");

  const handleSubmit = ( evt ) => {
    evt.preventDefault()
    props.singUpClick( email, password )
  }

  return (
    <div className="user-form">
      <h2 className="user-form__header">{ props.title }</h2>
      <form
        className="user-form__form"
        onSubmit={ handleSubmit }
      >
        <input
          type="email"
          className="user-form__form-element"
          placeholder="Email"
          value={ email }
          onChange={ e => setEmail( e.target.value ) }
          required
        />
        <input
          type="password"
          className="user-form__form-element"
          placeholder="Пароль"
          value={ password }
          onChange={ e => setPassword( e.target.value ) }
          required
        />
        <button
          type="submit"
          className="user-form__submit"
        >
          { props.button }
        </button>
      </form>
      {props.children}
    </div>
  );
}
