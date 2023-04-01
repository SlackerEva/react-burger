import { createAsyncThunk } from '@reduxjs/toolkit';
import { TLoginData, TUserData, TResetData } from '../../types/types';
import { reqForgotPass, reqResetPass, register, login, getUser, changeUserData } from '../../utils/auth-api';

export const fetchForgotPass = createAsyncThunk(
  'auth/fetchForgotPass',
  async (email: string) => {
    return await reqForgotPass(email);
  }
)

export const fetchResetPass = createAsyncThunk(
  'auth/fetchResetPass',
  async (data: TResetData) => {
    return await reqResetPass(data);
  }
)

export const fetchRegister = createAsyncThunk(
  'auth/fetchRegister',
  async (data: TUserData) => {
    const res = await register(data);
    return res; 
  }
)


export const fetchLogin= createAsyncThunk(
  'auth/fetchLogin',
  async (data: TLoginData) => {
    const res = await login(data);
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
  async (data: TUserData) => {
    const res = await changeUserData(data);
    return res; 
  }
)