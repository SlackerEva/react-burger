import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers/reducers';
import authSlice from './reducers/authSlice';

export const store = configureStore({
  reducer: {
    ingredients: rootReducer,
    auth: authSlice,
  },
});