const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-36',
  headers: {
    authorization: '7eda4b69-1241-4134-ae0f-5b43345c19b6',
    'Content-Type': 'application/json',
  },
};

const handleResponse = res => {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
};

export const getProfile = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then(handleResponse);
};

export const getCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then(handleResponse);
};

export const updateProfile = ({ name, about }) => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
    method: 'PATCH',
    body: JSON.stringify({ name, about }),
  }).then(handleResponse);
};

export const addCard = ({ name, link }) => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
    method: 'POST',
    body: JSON.stringify({ name, link }),
  }).then(handleResponse);
};

export const deleteCard = cardId => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    headers: config.headers,
    method: 'DELETE',
  }).then(handleResponse);
};

export function toggleCardLike(cardId, hasLike) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    headers: config.headers,
    method: hasLike ? 'DELETE' : 'PUT',
  }).then(handleResponse);
}

export const updateAvatar = avatar => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    headers: config.headers,
    method: 'PATCH',
    body: JSON.stringify({ avatar }),
  }).then(handleResponse);
};
