class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers
  }

  _checkResponse (res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  _request(url, options) {
    return fetch(url, options).then(this._checkResponse)
  }

  // get profile
  getProfile () {
    return this._request(this._baseUrl + '/users/me', {
      headers: this._headers,
    })
  }

  
  // get cards
  getCards () {
    return this._request(this._baseUrl + '/cards', {
      headers: this._headers,
    })
  }


  // edit profile
  editProfile (name, about) {
    return this._request(this._baseUrl + '/users/me', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about,
      })
    })
  }


  // add new card
  sendNewCard (name, link) {
    return this._request(this._baseUrl + '/cards', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      })
    })
  }


  // delete card
  deleteCardRequest (cardId) {
    return this._request(this._baseUrl + '/cards/' + cardId, {
      method: 'DELETE',
      headers: this._headers,
    })
  }


  // add/remove like
  addLike (cardId) {
    return this._request(this._baseUrl + '/cards/' + cardId + '/likes', {
      method: 'PUT',
      headers: this._headers,
    })
  }

  removeLike (cardId) {
    return this._request(this._baseUrl + '/cards/' + cardId + '/likes', {
      method: 'DELETE',
      headers: this._headers,
    })
  }


  // edit avatar
  editAvatarRequest (avatarLink) {
    return this._request(this._baseUrl + '/users/me/avatar', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatarLink,
      })
    })
  }
}
export { Api };