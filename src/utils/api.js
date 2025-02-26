export class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Erro: ${res.status}`);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then(this._checkResponse);
  }

  updateUserInfo(name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
      method: `PATCH`,
      body: JSON.stringify({ name, about }),
    }).then(this._checkResponse);
  }

  getIncitalCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then(this._checkResponse);
  }

  createCard(name, link) {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
      method: `POST`,
      body: JSON.stringify({ name, link }),
    }).then(this._checkResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      headers: this._headers,
      method: `DELETE`,
    }).then(this._checkResponse);
  }

  likeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      headers: this._headers,
      method: `PUT`,
    }).then(this._checkResponse);
  }

  unlikeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      headers: this._headers,
      method: `DELETE`,
    }).then(this._checkResponse);
  }
  updateAvatar(avatarUrl) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatarUrl,
      }),
    }).then(this._checkResponse);
  }
}
