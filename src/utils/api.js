class Api {
  constructor( options ) {
    this.options = options;
  }

  _getResponseData( res ) {
    if ( res.ok ) {
      return res.json();
    }
    return Promise.reject( res.status ); 
  }

  _getProfileInfo() {
    return fetch( `${ this.options.baseUrl }/users/me`, {
      headers: this.options.headers
    })
      .then( res => {
        return this._getResponseData( res )
      })
  }

  setUserInfo( name, about ) {
    return fetch( `${ this.options.baseUrl }/users/me`, {
      method: 'PATCH',
      headers: this.options.headers,
      body: JSON.stringify({
        name,
        about
      })
    })
      .then( res => {
        return this._getResponseData( res )
      })
  }

  setAvatar( avatar ) {
    return fetch( `${ this.options.baseUrl }/users/me/avatar`, {
      method: 'PATCH',
      headers: this.options.headers,
      body: JSON.stringify({
        avatar
      })
    })
      .then( res => {
        return this._getResponseData( res )
      })
  }

  _getInitialCards() {
    return fetch( `${ this.options.baseUrl }/cards`, {
      headers: this.options.headers
    })
      .then( res => {
        return this._getResponseData( res )
      })
  }

  getData() {
    return Promise.all([ this._getProfileInfo(), this._getInitialCards() ])
  }

  setLikePhoto( cardId, method ) {
    return fetch( `${ this.options.baseUrl }/cards/${ cardId }/likes`, {
      method,
      headers: this.options.headers
    })
      .then( res => {
        return this._getResponseData( res )
      })
  }

  addCard( name, link ) {
    return fetch( `${ this.options.baseUrl }/cards`, {
      method: "POST",
      headers: this.options.headers,
      body: JSON.stringify({
        name,
        link,
      })
    })
      .then( res => {
        return this._getResponseData( res )
      })
  }

  deleteCard( cardId ) {
    return fetch( `${ this.options.baseUrl }/cards/${ cardId }`, {
      method: "DELETE",
      headers: this.options.headers,
    })
      .then( res => {
        return this._getResponseData( res )
      })
  }
}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-34',
  headers: {
    authorization: '345e5c19-f25d-4ca1-8647-9df6adf7e21f',
    'Content-Type': 'application/json'
  }
});

export default api