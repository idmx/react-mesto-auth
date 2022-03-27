import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function RemovePopup( props ) {
  return(
    <PopupWithForm
      name="delete"
      title="Вы уверены?"
      button="Да"
      isOpen={ props.isOpen }
      onClose={ props.onClose }
      onSubmit={ props.onRemoveCard }
    /> 
  )
}