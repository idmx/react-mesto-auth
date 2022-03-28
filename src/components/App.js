import '../index.css';
import React from 'react';
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import EditProfilePopup from './EditProfilePopup'
import EditAvatarPopup from './EditAvatarPopup'
import ImagePopup from './ImagePopup';
import api from '../utils/api';
import { CurrentUserContext, user } from '../contexts/CurrentUserContext'
import { CardsContext } from '../contexts/CardsContext'
import AddPlacePopup from './AddPlacePopup'
import RemovePopup from './RemovePopup';
import { Route, Switch } from 'react-router-dom'
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import authApi from '../utils/authApi';
import ProtectedRoute from './ProtectedRoute';

function App() {

  const [ isEditProfilePopupOpen, setIsEditProfilePopupOpen ] = React.useState( false );
  const [ isAddPlacePopupOpen, setIsAddPlacePopupOpen ] = React.useState( false );
  const [ isEditAvatarPopupOpen, setIsEditAvatarPopupOpen ] = React.useState( false );
  const [ isRemovePopupOpen, setIsRemovePopupOpen ] = React.useState( false );
  const [ selectedCard, setSelectedCard ] = React.useState({});
  const [ isSelectedCard, setIsSelectedCard ] = React.useState( false );
  const [ currentUser, setCurrentUser ] = React.useState( user );
  const [ cardList, setCardList ] = React.useState([]);
  const [ removedCard, setRemovedCard ] = React.useState({});
  const [ isInfoTooltipOpen, setIsInfoTooltipOpen ] = React.useState( false );
  const [ loggedIn, setLoggedIn ] = React.useState( false );
  const [ email, setEmail ] = React.useState( "" );
  const [ message, setMessage ] = React.useState( "" );
  const [ hasSuccess, setHasSuccess ] = React.useState( false );

  React.useEffect(() => {
    const jwt = localStorage.getItem( 'JWT' );
    api.getData()
      .then( ( [ userInform, cards ] ) => {
        setCurrentUser( userInform );
        setCardList( cards );
      })
      .catch( err => console.log(`Ошибка загрузки данных: ${err}` ) );
    authApi.isSigned( jwt )
      .then( res => {
        setEmail( res.data.email );
        setLoggedIn( true );
      })
      .catch( err => {
        setLoggedIn( false );
      })
  }, [])

  function handleSignUpClick( email, password ) {
    authApi.signUp( email, password )
      .then( res => {
        setEmail( res.data.email );
        setMessage( 'Вы успешно зарегистрировались!' );
        setIsInfoTooltipOpen( true );
        setHasSuccess( true );
      })
      .catch(() => {
        setMessage( 'Что-то пошло не так! Попробуйте ещё раз.' );
        setHasSuccess( false );
        setIsInfoTooltipOpen( true );
      })
  }

  function handleSignInClick( email, password, history ) {
    authApi.signIn( email, password )
      .then( res => {
        setEmail( email );
        setLoggedIn( true );
        localStorage.setItem( 'JWT', res.token )
        history.push( '/' );
      })
      .catch(() => {
        setMessage( 'Что-то пошло не так! Попробуйте ещё раз.' );
        setHasSuccess( false );
        setIsInfoTooltipOpen( true );
      })
  }

  function handleLogout() {
    localStorage.removeItem('JWT');
    setLoggedIn( false );
  }
  
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen( true );
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen( true );
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen( true );
  }

  function handleRemoveCardClick( card ) {
    setIsRemovePopupOpen( true );
    setRemovedCard( card );
  }

  function handleCardClick( card ) {
    setIsSelectedCard( true );
    setSelectedCard( card );
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen( false );
    setIsEditAvatarPopupOpen( false );
    setIsAddPlacePopupOpen( false );
    setIsSelectedCard( false );
    setIsRemovePopupOpen( false );
    setIsInfoTooltipOpen( false );
  }

  function handleUpdateUser({ name, about }) {
    api.setUserInfo( name, about )
    .then( user => setCurrentUser( user ) )
    .catch( err => console.log(`Ошибка загрузки данных: ${err}` ) )
  }

  function handleUpdateAvatar({ avatar }) {
    api.setAvatar( avatar )
    .then( user => setCurrentUser( user ) )
    .catch( err => console.log(`Ошибка загрузки данных: ${err}` ) )
  }

  function handleCardLike( card ) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    let method = '';
    method = isLiked ? 'DELETE' : 'PUT'
    api.setLikePhoto( card._id, method )
    .then( ( newCard ) => {
      setCardList( ( state ) => state.map( ( c ) => c._id === card._id ? newCard : c ) );
    })
    .catch( err => console.log(`Ошибка загрузки данных: ${err}` ) )
  }

  function handleCardDelete( evt ) {
    evt.preventDefault();
    closeAllPopups();
    api.deleteCard( removedCard._id )
    .then( () => {
      setCardList( ( state ) => state.filter( ( c ) => c._id !== removedCard._id ) );
    })
    .catch( err => console.log(`Ошибка загрузки данных: ${ err }` ) )
  }

  function handleAddPlaceSubmit({ name, link }) {
    api.addCard( name, link )
    .then( ( newCard ) => setCardList( ( state ) => state = [ newCard, ...state ] ) );
  }

  return (
    <div className="page">
      <Header
        email={ email }
        loggedIn={ loggedIn }
        handleLogout={ handleLogout }
      />
      <Switch>
        <ProtectedRoute
          exact path="/"
          loggedIn={ loggedIn }
        >
          <CurrentUserContext.Provider value={ currentUser }>
            <CardsContext.Provider value= { cardList }>
              <Main 
                onEditProfile={ handleEditProfileClick }
                onAddPlace={ handleAddPlaceClick }
                onEditAvatar={ handleEditAvatarClick }
                onCardClick={ handleCardClick }
                setCardList={ setCardList }
                onCardLike={ handleCardLike }
                onCardDelete={ handleRemoveCardClick }
              />
            </CardsContext.Provider>
          </CurrentUserContext.Provider>
          <Footer />
          <CurrentUserContext.Provider value={ currentUser }>
            <EditProfilePopup 
              isOpen={ isEditProfilePopupOpen }
              onClose={ closeAllPopups }
              onUpdateUser={ handleUpdateUser }
            >
            </EditProfilePopup>
          </CurrentUserContext.Provider>
          <AddPlacePopup
            isOpen={ isAddPlacePopupOpen }
            onClose={ closeAllPopups }
            onAddPlace={ handleAddPlaceSubmit }
          >
          </AddPlacePopup>
          <EditAvatarPopup
            isOpen={ isEditAvatarPopupOpen }
            onClose={ closeAllPopups }
            onUpdateAvatar={ handleUpdateAvatar }
          >
          </EditAvatarPopup>
          <ImagePopup
            card={ selectedCard }
            isOpen={ isSelectedCard }
            onClose={ closeAllPopups }
          >
          </ImagePopup>
          <RemovePopup
            isOpen={ isRemovePopupOpen }
            onClose={ closeAllPopups }
            onRemoveCard={ handleCardDelete }
          >
          </RemovePopup>
        </ProtectedRoute>
        <Route path="/sign-up">
          <Register
            signUpClick={ handleSignUpClick }
            loggedIn={ loggedIn }
          />
          <InfoTooltip 
            hasSuccess={ hasSuccess }
            text={ message }
            isOpen={ isInfoTooltipOpen }
            onClose={ closeAllPopups }
          />
        </Route>
        <Route path="/sign-in">
          <Login
            signInClick={ handleSignInClick }
            loggedIn={ loggedIn }
          />
          <InfoTooltip 
            hasSuccess={ hasSuccess }
            text={ message }
            isOpen={ isInfoTooltipOpen }
            onClose={ closeAllPopups }
          />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
