import React from "react";
import Card from "./Card";
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import { CardsContext } from '../contexts/CardsContext'

export default function Main( props ) {
  const currentUser = React.useContext( CurrentUserContext )
  const cardList = React.useContext( CardsContext )

  return(
    <main className="content">
      <section className="profile">   
        <div className="profile__info">
          <button
            className="profile__avatar"
            type="button"
            onClick={ props.onEditAvatar }
            style={{ backgroundImage: `url(${ currentUser.avatar })` }} 
          >
            <div className="profile__edit-avatar"></div>
          </button>
          <h1 className="profile__name">{ currentUser.name }</h1>
          <button
            className="profile__edit-button"
            type="button"
            onClick={ props.onEditProfile } />
          <p className="profile__about">{ currentUser.about }</p>
        </div>
        <button
          className="profile__add-button"
          type="button"
          onClick={ props.onAddPlace }
        />
      </section>
      <section className="elements">
        {
          cardList.map( card => {
            return (
              <Card
                card={ card }
                key={ card._id }
                onCardClick={ props.onCardClick }
                onCardLike={ props.onCardLike }
                onCardDelete={ props.onCardDelete }
              />
            );
          })
        }
      </section>
    </main>
  );
}