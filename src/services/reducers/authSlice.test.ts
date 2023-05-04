import authSlice from "./authSlice";
import { initialState, logout, loggedIn } from "./authSlice";
import { fetchRegister, fetchLogin, fetchGetUser, fetchChangeUserData, fetchForgotPass, fetchResetPass } from "../actions/authActions";

describe('auth slice', () => {
  const payload = { user: {name:'name', email:'email'} };
  const testData = {
    userName: 'name',
    email: 'email',
  }

  it('should return the initial state', () => {
    expect(authSlice(undefined, {type: undefined})).toEqual(initialState)
  });

  it('should handle logout', () => {
    const expectedState = { isLoggedIn: false, userName: '', email: '', resetPass: false};
    expect(authSlice(initialState, logout())).toEqual(expectedState);
  });

  it('should handle loggedIn', () => {
    const expectedState = { isLoggedIn: true, userName: '', email: '', resetPass: false};
    expect(authSlice(initialState, loggedIn())).toEqual(expectedState);
  });

  it ('should return the fetchRegister.fulfilled', () => {
    const action = { type: fetchRegister.fulfilled.type, payload };
    const expectedState = { isLoggedIn: false, ...testData, resetPass: false };
    expect(authSlice(initialState, action)).toEqual(expectedState);
  });

  it ('should return the fetchLogin.fulfilled', () => {
    const action = { type: fetchLogin.fulfilled.type, payload };
    const expectedState = { isLoggedIn: true, ...testData, resetPass: false };
    expect(authSlice(initialState, action)).toEqual(expectedState);
  });

  it ('should return the fetchGetUser.fulfilled', () => {
    const action = { type: fetchGetUser.fulfilled.type, payload };
    const expectedState = { isLoggedIn: true, ...testData, resetPass: false };
    expect(authSlice(initialState, action)).toEqual(expectedState);
  });

  it ('should return the fetchChangeUserData.fulfilled', () => {
    const action = { type: fetchChangeUserData.fulfilled.type, payload };
    const expectedState = { isLoggedIn: false, ...testData, resetPass: false };
    expect(authSlice(initialState, action)).toEqual(expectedState);
  });

  it ('should return the fetchForgotPass.fulfilled', () => {
    const action = { type: fetchForgotPass.fulfilled.type, payload: { success: true } };
    const expectedState = { isLoggedIn: false, userName: '', email: '', resetPass: true };
    expect(authSlice(initialState, action)).toEqual(expectedState);
  });

  it ('should return the fetchResetPass.fulfilled', () => {
    const action = { type: fetchResetPass.fulfilled.type, payload };
    const expectedState = { isLoggedIn: false, userName: '', email: '', resetPass: false};
    expect(authSlice(initialState, action)).toEqual(expectedState);
  });
});