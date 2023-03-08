const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then(err => Promise.reject(err));
}

const checkSuccess = (res) => {
  return (res && res.success) ? res : Promise.reject(`Ответ не success: ${res}`);
}

const BASE_URL = process.env.REACT_APP_BASE_URL || "https://norma.nomoreparties.space/api";

const request = (url, option) => {
  return fetch(`${BASE_URL}/${url}`, option)
    .then(checkResponse)
    .then(checkSuccess)
}

export const getIngredients = () => {
  return request('ingredients', {});
};

export const getOrderNumber = (ing_Id) => {
  return request('orders', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "ingredients": ing_Id
    })
  });
}