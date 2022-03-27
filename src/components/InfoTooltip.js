import React from "react";
import PopupWithForm from "./PopupWithForm";
import success from "../images/success.svg"
import failure from "../images/failure.svg"

export default function InfoTooltip( props ) {
  const logo = require("../images/like.svg")
  return(
    <PopupWithForm
      name="delete"
      isOpen={ props.isOpen }
      onClose={ props.onClose }
      onSubmit={ props.onRemoveCard }
      hasButton={ false }
    >
      <img
        className="tooltip__image"
        src={ props.hasSuccess ? success : failure }
        alt={ props.hasSuccess ? "success" : "failure" }
      />
      <p className="tooltip__text">{ props.text }</p>
    </PopupWithForm>
  )
}