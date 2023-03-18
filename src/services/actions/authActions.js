import { createAsyncThunk } from '@reduxjs/toolkit';
import { reqForgotPass, reqResetPass, register, login, getUser, changeUserData } from '../../utils/auth-api';

export const fetchForgotPass = createAsyncThunk(
  'auth/fetchForgotPass',
  async (email) => {
    return await reqForgotPass(email);
  }
)

export const fetchResetPass = createAsyncThunk(
  'auth/fetchResetPass',
  async (password, token) => {
    return await reqResetPass(password, token);
  }
)

export const fetchRegister = createAsyncThunk(
  'auth/fetchRegister',
  async ({userName, email, password}) => {
    const res = await register(userName, email, password);
    return res; 
  }
)


export const fetchLogin= createAsyncThunk(
  'auth/fetchLogin',
  async ({ email, password}) => {
    const res = await login(email, password);
    return res; 
  }
)

export const fetchGetUser= createAsyncThunk(
  'auth/fetchGetUser',
  async () => {
    const res = await getUser();
    return res; 
  }
)

export const fetchChangeUserData = createAsyncThunk(
  'auth/fetchChangeUserData',
  async (name, email, password) => {
    console.log(name, email, password);
    const res = await changeUserData(name, email, password);
    console.log(res);
    return res; 
  }
)