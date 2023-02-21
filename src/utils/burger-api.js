const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then(err => Promise.reject(err));
}

export const getIngredients = () => {
  return fetch(`${process.env.REACT_APP_BASE_URL}/ingredients`)
    .then(checkResponse)
    .then(data => {
      if (data.success === true) {
        return data;
      }
      return Promise.reject(data);
    })
};

export const getOrderNumber= (ing_Id) => {
  return fetch(`${process.env.REACT_APP_BASE_URL}/orders`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "ingredients": ing_Id
    })
  })
    .then(checkResponse)
    .then(data => {
      if (data.success === true) {
        return data;
      }
      return Promise.reject(data);
    })
}