import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers/reducers';

// const sayHiMiddleWare = store => next => action => {
//   console.log('Привет!');
//   return next(action);
// };

export const store = configureStore({
  reducer: {
    ingredients: rootReducer,
  },
});