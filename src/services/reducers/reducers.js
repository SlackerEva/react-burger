import { createSlice } from '@reduxjs/toolkit';
import  { fetchIngredients, fetchOrderNumber } from '../actions/actions';

const initialState = {
  ingredients: [],
  ingrData: [],
  orderNumber: null,
}

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    addIngredientData: (state, action) => {
      state.ingrData =  (action.payload.item.type === 'bun' && state.ingrData.length === 0) ? [...state.ingrData, action.payload] : state.ingrData;
      state.ingrData =  (action.payload.item.type === 'bun' && state.ingrData.length !== 0) ? [...state.ingrData.filter(obj => obj.item.type !=='bun'), action.payload] : state.ingrData;
      state.ingrData =  (action.payload.item.type !== 'bun' && state.ingrData.length !== 0) ? [...state.ingrData, action.payload] : state.ingrData;
    },
    removeIngredientData: (state, action) => {
      state.ingrData = state.ingrData.filter((item) => item.dragId !== action.payload);
    },
    removeAllIngredientData: (state) => {
      state.ingrData = [];
    },
    updateIngredientData: (state, action) => {
      const bun = action.payload.find(obj => obj.item.type === 'bun');
      const newArr = action.payload.filter(obj => obj.item.type !== 'bun');
      state.ingrData = [...newArr, bun, bun];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.ingredients = action.payload.data;
        })
    builder
    .addCase(fetchOrderNumber.fulfilled, (state, action) => {
      state.orderNumber = action.payload.order.number;
    })
  },
})

export const { getAllIngredients, addIngredientData, removeIngredientData, updateIngredientData, getONumber, removeAllIngredientData } = ingredientsSlice.actions;
export default ingredientsSlice.reducer;