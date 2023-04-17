import { getCookie } from "./cookie";

export const checkResponse = (res: Response) => {
  return res.ok ? res.json() : res.json().then(err => Promise.reject(err));
}

export const checkSuccess = (res: any) => {
  return (res && res.success) ? res : Promise.reject(`Ответ не success: ${res}`);
}

export const BASE_URL = process.env.REACT_APP_BASE_URL || "https://norma.nomoreparties.space/api";

export const request = (url: string, option: {}, custom_postprocess?: any) => {
  return fetch(`${BASE_URL}/${url}`, option)
    .then(custom_postprocess ?? ((res) => { return res }))
    .then(checkResponse)
    .then(checkSuccess)
}

export const getIngredients = () => {
  return request('ingredients', {});
};

export const getOrderNumber = (ing_Id: string[]) => {
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

export const addOrder = (data: string[]) => {
  console.log(data);
  return request('orders', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      "Content-Type": "application/json",
      "authorization": getCookie('token')
    },
    body: JSON.stringify({
      "ingredients": data
    }),
  })
}