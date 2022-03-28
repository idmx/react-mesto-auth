import { useLocation, useHistory } from "react-router-dom";

export default function Header( props ) {
  const path = useLocation().pathname;
  const history = useHistory();
  let pathTo = '';
  let buttonTitle = '';

  if ( path === '/sign-in' ) {
    buttonTitle = 'Зарегистрироваться';
    pathTo = '/sign-up';
  } else if ( path === '/sign-up' ) {
    buttonTitle = 'Войти';
    pathTo = '/sign-in';
  } else {
    buttonTitle = 'Выйти';
    pathTo = '/sign-in';
  }

  function handleClick() {
    buttonTitle === 'Выйти' && props.handleLogout();
    history.push( pathTo );
  }

  return (
    <header className="header">
      <div className="header__logo"></div>
      <div className="header__action">
        { props.loggedIn && <span className="header__email">{ props.email }</span> }
        <button className="header__button" onClick={ handleClick }>{ buttonTitle }</button>
      </div>
    </header>
  );
}