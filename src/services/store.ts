import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers/reducers';
import authSlice from './reducers/authSlice';

export const store = configureStore({
  reducer: {
    ingredients: rootReducer,
    auth: authSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;