import { createSlice } from '@reduxjs/toolkit';
import { setCookie, removeCookie } from '../../utils/cookie';
import  { fetchForgotPass, fetchRegister, fetchLogin, fetchGetUser, fetchChangeUserData, fetchResetPass } from '../actions/authActions';

const initialState = {
  isLoggedIn: false,
  userName: '',
  email: '',
  refreshToken: '',
  resetPass: false,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      removeCookie('token');
      localStorage.removeItem('refreshToken');
      state.userName = '';
      state.email = '';
      state.isLoggedIn = false;
    },
    loggedIn: (state) => {
      state.isLoggedIn = true;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRegister.fulfilled, (state, action) => {
        state.userName = action.payload.user.name;
        state.email = action.payload.user.email;
        setCookie('token', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
      })
      .addCase(fetchRegister.rejected, (action) => {
        console.log(action.message);
      })

    builder
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.userName = action.payload.user.name;
        state.email = action.payload.user.email;
        setCookie('token', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
      })
      .addCase(fetchLogin.rejected, (action) => {
        console.log(action.message);
      })

    builder
      .addCase(fetchGetUser.fulfilled, (state, action) => {
        state.userName = action.payload.user.name;
        state.email = action.payload.user.email;
        state.isLoggedIn = true;
      })
    
    builder
      .addCase(fetchChangeUserData.fulfilled, (state, action) => {
        state.userName = action.payload.user.name;
        state.email = action.payload.user.email;
      })

    builder
      .addCase(fetchForgotPass.fulfilled, (state, action) => {      
        state.resetPass = action.payload.success;
      })

    builder
      .addCase(fetchResetPass.fulfilled, (state, action) => {      
        state.resetPass = false;
      })


  },
})

export const { logout, loggedIn } = authSlice.actions;
export default authSlice.reducer;