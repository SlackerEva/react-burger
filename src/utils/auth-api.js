
import { setCookie, getCookie } from "./cookie";

const checkResponse = async (res) => {
  if (res.ok) {
    console.log("CheckRespo: OK");
    return res.json();
  } 
  console.log("CheckRespo: NOT OK");
  return res.json().then(err => Promise.reject(err));
}

const checkSuccess = (res) => {
  if (res && res.success) {
    console.log("CheckSuccess: OK");
    return res;
  }
  console.log("CheckSuccess: NOT OK");
  return Promise.reject(`Ответ не success: ${res}`);
}

const BASE_URL = process.env.REACT_APP_BASE_URL || "https://norma.nomoreparties.space/api";

// async function fetchWithTimeout(resource, options = {}) {
//   const { timeout = 1000 } = options;
  
//   const controller = new AbortController();
//   const id = setTimeout(() => controller.abort(), timeout);
//   const response = await fetch(resource, {
//     ...options,
//     signal: controller.signal  
//   });
//   clearTimeout(id);
//   return response;
// }

const request = (url, option) => {
  return fetch(`${BASE_URL}/${url}`, option)
    .then(checkResponse)
    .then(checkSuccess)
}

export const login = (email, password) => {
  console.log(email, password);
  return request('auth/login', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "email": email, 
      "password": password, 
    })
  });
}

export const register = (name, email, password) => {
  console.log("Sending " + email + " " + name + " "+ password )
  return request('auth/register', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "email": email, 
      "password": password, 
      "name": name
    })
  });
}

const saveTokens = (refreshToken, accessToken) => {
  setCookie('token', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
 }

export const getUser = async () => {
  try {
    return await request('auth/user', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        "Content-Type": "application/json",
        "authorization": getCookie('token')
      }
    });
  } catch(err) {
    if (err.message === 'jwt expired') {
      console.log('jwt expired');
      const {refreshToken, accessToken} = await getToken();
      saveTokens(refreshToken, accessToken);  
      const res = await request('user', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          "Content-Type": "application/json",
          "authorization": getCookie('token')
        }
      });
      return res;
    }
  }
}

export const changeUserData = async (name, email, password) => {
  try {
  const res = await request('auth/user', {
    method: 'PATCH',
    headers: {
      'Accept': 'application/json',
      "Content-Type": "application/json",
      "authorization": getCookie('token')
    },
    body: JSON.stringify({
      "email": email, 
      "password": password, 
      "name": name
    })
  });
    return res;
  } catch (err) {
    console.log("err: " + err);
  }
}

export const getToken = () => {
  return request('auth/token', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      token: localStorage.getItem('refreshToken')
    })
  });
}

export const reqForgotPass = (email) => {
  return request('password-reset', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "email": email
    })
  });
}

export const reqResetPass = ({password, token}) => {
  return request('password-reset/reset', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "password": password,
      "token": token
    })
  });
}

