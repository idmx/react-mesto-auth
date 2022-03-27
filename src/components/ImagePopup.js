export default function ImagePopup( props ) {
  return(
    <div className={`popup popup_photo ${ props.isOpen ? 'popup_opened' : '' }`}>
      <div className="popup__container-photo">
        <img
          className="popup__photo-element"
          src={ props.card.link }
          alt={ props.card.name }
        />
        <button className="popup__close"
          type="button"
          onClick={ props.onClose }
        />
        <p className="popup__photo-title">{ props.card.name }</p>
      </div>
    </div>
  );
}