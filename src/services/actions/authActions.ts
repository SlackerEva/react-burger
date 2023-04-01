import { createAsyncThunk } from '@reduxjs/toolkit';
import { reqForgotPass, reqResetPass, register, login, getUser, changeUserData } from '../../utils/auth-api';

export const fetchForgotPass = createAsyncThunk(
  'auth/fetchForgotPass', reqForgotPass
)

export const fetchResetPass = createAsyncThunk(
  'auth/fetchResetPass', reqResetPass
)

export const fetchRegister = createAsyncThunk(
  'auth/fetchRegister', register
)

export const fetchLogin= createAsyncThunk(
  'auth/fetchLogin', login
)

export const fetchGetUser= createAsyncThunk(
  'auth/fetchGetUser', getUser
)

export const fetchChangeUserData = createAsyncThunk(
  'auth/fetchChangeUserData', changeUserData
)