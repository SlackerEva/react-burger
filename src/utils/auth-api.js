
import { setCookie, getCookie } from "./cookie";
import { request } from './burger-api';

export const login = (email, password) => {
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


const getUserData = async (postprocess) => {
  console.log('here');
  return request('auth/user',{
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      "Content-Type": "application/json",
      "authorization": getCookie('token')
    }
  }, postprocess);
}

const refreshExpiredToken = async (res) => {
  if (res.status === 403) {
    const body = await res.json();
    if (body.message === 'jwt expired') {
      const {refreshToken, accessToken} = await getToken();
      saveTokens(refreshToken, accessToken);  
      return await getUserData();
    }
    Promise.reject(`Forbidden: ${res}`)
  }
  return res;
}


export const getUser = async () => {
  const res = await getUserData(refreshExpiredToken);
  return res;
}

export const changeUserData = async ({name, email, password}) => {
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

