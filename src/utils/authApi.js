class AuthApi {
  constructor( options ) {
    this.options = options;
  }

  _getResponseData( res ) {
    if ( res.ok ) {
      return res.json();
    }
    return Promise.reject( res.status ); 
  }

  signUp( email, password ) {
    return fetch( `${ this.options.baseUrl }/signup`, {
      method: "POST",
      headers: this.options.headers,
      body: JSON.stringify({
          password,
          email,
      })
    })
      .then( res => {
        return this._getResponseData( res )
      })
  }

  signIn( email, password ) {
    return fetch( `${ this.options.baseUrl }/signin`, {
      method: "POST",
      headers: this.options.headers,
      body: JSON.stringify({
          password,
          email,
      })
    })
      .then( res => {
        return this._getResponseData( res )
      })
  }

  isSigned( jwt ) {
    return fetch( `${ this.options.baseUrl }/users/me`, {
      headers: {
        'Content-Type': 'application/json',
        "Authorization" : `Bearer ${ jwt }`
      }
    })
      .then( res => {
        return this._getResponseData( res )
      })
  }

}
  const authApi = new AuthApi({
    baseUrl: 'https://auth.nomoreparties.co',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  
  export default authApi