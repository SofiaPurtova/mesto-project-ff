const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-29',
    headers: {
      authorization: 'f9e240a7-ecbe-4c3b-ad2a-e207beb70d7e',
      'Content-Type': 'application/json'
    }
  }

function checkResponse(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}

export const getProfileInfo  = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: "GET",
        headers: {
            authorization: config.headers.authorization,
        },
    })
        .then(checkResponse);
};

export const getInitialCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
        method: "GET",
        headers: config.headers
    })
        .then(checkResponse)
}

export const patchProfileInfo = (name, about) => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: "PATCH",
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            about: about
        })
    })
    .then(checkResponse);
}

export const postCard = (name, link) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: "POST",
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            link: link
        })
    })
    .then(checkResponse);
}

export const deleteCard = (id) => {
    return fetch(`${config.baseUrl}/cards/${id}`, {
        method: 'DELETE',
        headers: config.headers
    })
        .then(checkResponse)
}

export const putLike = (id) => {
    return fetch(`${config.baseUrl}/cards/likes/${id}`, {
        method: 'PUT',
        headers: config.headers
    })
        .then(checkResponse)
}

export const deleteLike = (id) => {
    return fetch(`${config.baseUrl}/cards/likes/${id}`, {
        method: 'DELETE',
        headers: config.headers
    })
        .then(checkResponse)
}

export const patchAvatar = (link) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: "PATCH",
        headers: config.headers,
        body: JSON.stringify({
           avatar: link
        })
    })
        .then(checkResponse)
}
