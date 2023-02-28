import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  ingredients: [],
  ingrData: [],
  orderNumber: null,
}

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    getAllIngredients: (state, action) => {
      state.ingredients = action.payload;
    },
    addIngredientData: (state, action) => {
      state.ingrData =  (action.payload.item.type === 'bun' && state.ingrData.length === 0) ? [...state.ingrData, action.payload] : state.ingrData;
      state.ingrData =  (action.payload.item.type === 'bun' && state.ingrData.length !== 0) ? [...state.ingrData.filter(obj => obj.item.type !=='bun'), action.payload] : state.ingrData;
      state.ingrData =  (action.payload.item.type !== 'bun' && state.ingrData.length !== 0) ? [...state.ingrData, action.payload] : state.ingrData;
    },
    removeIngredientData: (state, action) => {
      state.ingrData = state.ingrData.filter((item) => item.dragId !== action.payload);
    },
    updateIngredientData: (state, action) => {
      const bun = action.payload.find(obj => obj.item.type === 'bun');
      const newArr = action.payload.filter(obj => obj.item.type !== 'bun');
      state.ingrData = [...newArr, bun, bun];
    },
    getONumber: (state, action) => {
      state.orderNumber = action.payload;
    },
  },
})

export const { getAllIngredients, addIngredientData, removeIngredientData, updateIngredientData, getONumber } = ingredientsSlice.actions;
export default ingredientsSlice.reducer;