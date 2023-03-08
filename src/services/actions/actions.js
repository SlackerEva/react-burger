import { createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredients, getOrderNumber } from '../../utils/burger-api';

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchIngredients',
  async () => {
    const res = await getIngredients();
    return res; 
  }
)

export const fetchOrderNumber = createAsyncThunk(
  'ingredients/fetchOrderNumber',
  async (ing_Id) => {
    const res = await getOrderNumber(ing_Id);
    return res; 
  }
)
