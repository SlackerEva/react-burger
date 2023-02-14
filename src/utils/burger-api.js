const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then(err => Promise.reject(err));
}

const getIngredients = (setIngredients) => {
  fetch(`${process.env.REACT_APP_BASE_URL}/ingredients`)
    .then(checkResponse)
    .then((data) => {
      setIngredients(data)
    })
};

export default getIngredients;