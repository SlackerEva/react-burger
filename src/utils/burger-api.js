const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then(err => Promise.reject(err));
}

const getIngredients = () => {
  return fetch(`${process.env.REACT_APP_BASE_URL}/ingredients`)
    .then(checkResponse)
    .then(data => {
      if (data.success === true) {
        return data;
      }
      return Promise.reject(data);
    })
};

export default getIngredients;