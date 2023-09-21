class Api {
  constructor(token) {
    this._token = token;
  }


  // get profile
  getProfile () {
    return fetch('https://nomoreparties.co/v1/cohort-75/users/me', {
      headers: {
        authorization: this._token,
      }
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

  
  // get cards
  getCards () {
    return fetch('https://nomoreparties.co/v1/cohort-75/cards', {
      headers: {
        authorization: this._token
      }
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }


  // edit profile
  editProfile (name, about) {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-75/users/me', {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        about: about,
      })
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }


  // add new card
  sendNewCard (name, link) {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-75/cards', {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json; charset=UTF-8'
      },
      body: JSON.stringify({
        name: name,
        link: link,
      })
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }


  // delete card
  deleteCardRequest (cardId) {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-75/cards/' + cardId, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json; charset=UTF-8'
      },
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }


  // add/remove like
  addLike (cardId) {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-75/cards/' + cardId + '/likes', {
      method: 'PUT',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json; charset=UTF-8'
      },
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

  removeLike (cardId) {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-75/cards/' + cardId + '/likes', {
      method: 'DELETE',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json; charset=UTF-8'
      },
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }


  // edit avatar
  editAvatarRequest (avatarLink) {
    console.log(avatarLink);
    return fetch('https://mesto.nomoreparties.co/v1/cohort-75/users/me/avatar', {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json; charset=UTF-8'
      },
      body: JSON.stringify({
        avatar: avatarLink,
      })
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }
}
export { Api };