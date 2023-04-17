import { combineReducers } from "redux";
import ordersSlice from "./ordersSlice";
import authSlice from "./authSlice";
import ingredientsSlice  from "./reducers";
import { wsOrderSlice } from "./ws-orders-reducers";

export const rootReducer = combineReducers({
  ingredients: ingredientsSlice,
  auth: authSlice,
  orders: wsOrderSlice,
  orderNum: ordersSlice
});