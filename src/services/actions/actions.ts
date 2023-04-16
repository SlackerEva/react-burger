import { createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredients, getOrderNumber, addOrder } from '../../utils/burger-api';

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchIngredients', getIngredients
)

export const fetchOrderNumber = createAsyncThunk(
  'ingredients/fetchOrderNumber', getOrderNumber
)

export const fetchOrder = createAsyncThunk(
  'orders/fetchOrder', addOrder
)