
import { setCookie, getCookie } from "./cookie";
import { request } from './burger-api';
import { TLoginData, TUserData, TResetData } from "../types/types";

export const login = async (data: TLoginData) => {
  return await request('auth/login', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  });
}

export const register = (data: TUserData) => {
  return request('auth/register', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  });
}

const saveTokens = (refreshToken: string, accessToken: string) => {
  setCookie('token', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
 }

const getUserData = async (postprocess?: any) => {
  return request('auth/user',{
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      "Content-Type": "application/json",
      "authorization": getCookie('token')
    }
  }, postprocess);
}

const refreshExpiredToken = async (res: any) => {
  if (res.status === 403) {
    const body = await res.json();
    if (body.message === 'jwt expired') {
      const {refreshToken, accessToken} = await getToken();
      saveTokens(refreshToken, accessToken);  
      console.log(refreshToken, accessToken);
      return await getUserData();
    }
    Promise.reject(`Forbidden: ${res}`)
  }
  return res;
}


export const getUser = async () => {
  const res = await getUserData(refreshExpiredToken);
  console.log(res);
  return res;
}

export const changeUserData = async (data: TUserData) => {
  const res = await request('auth/user', {
    method: 'PATCH',
    headers: {
      'Accept': 'application/json',
      "Content-Type": "application/json",
      "authorization": getCookie('token')
    },
    body: JSON.stringify(data)
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

export const reqForgotPass = (email: string) => {
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

export const reqResetPass = (data: TResetData) => {
  return request('password-reset/reset', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  });
}

