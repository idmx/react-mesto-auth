import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext'

export default function EditProfilePopup( props ) {
  const currentUser = React.useContext( CurrentUserContext );
  const [ name, setName ] = React.useState( currentUser.name );
  const [ description , setDescription  ] = React.useState( currentUser.about );

  React.useEffect( () => {
    resetEditForm();
  }, [ currentUser, props.isOpen ]);

  function handleSubmit( evt ) {
    evt.preventDefault();
    props.onClose();
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  function resetEditForm() {
    setName( currentUser.name );
    setDescription( currentUser.about );
  }

  return(
    <PopupWithForm 
      name="edit"
      title="Редактировать профиль"
      button="Сохранить"
      isOpen={ props.isOpen }
      onClose={ props.onClose }
      onSubmit={ handleSubmit }
    >
      <input type="text" id="name-input" className="popup__form-element" name="name-profile"
      value={ name || "" } onChange={ e => setName( e.target.value ) } placeholder="Ваше имя" required minLength="2" maxLength="40" />
      <span className="popup__error name-input-error"></span>
      <input type="text" id="about-input" className="popup__form-element" name="about-profile" 
      value={ description || "" } onChange={ e => setDescription( e.target.value ) } placeholder="О себе" required minLength="2" maxLength="200" />
      <span className="popup__error popup__error_visible about-input-error"></span>
    </PopupWithForm>
  )
}