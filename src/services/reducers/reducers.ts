import { createSlice } from '@reduxjs/toolkit';
import  { fetchIngredients, fetchOrderNumber } from '../actions/actions';

const initialState = {
  ingredients: [],
  ingrData: <any>[],
  orderNumber: null,
  isModalOpen: false,
}

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    addIngredientData: (state, action) => {
      state.ingrData =  (action.payload.item.type === 'bun' && state.ingrData.length === 0) ? [...state.ingrData, action.payload] : state.ingrData;
      state.ingrData =  (action.payload.item.type === 'bun' && state.ingrData.length !== 0) ? [...state.ingrData.filter((obj: any) => obj.item.type !=='bun'), action.payload] : state.ingrData;
      state.ingrData =  (action.payload.item.type !== 'bun' && state.ingrData.length !== 0) ? [...state.ingrData, action.payload] : state.ingrData;
    },
    removeIngredientData: (state, action) => {
      state.ingrData = state.ingrData.filter((item: any) => item.dragId !== action.payload);
    },
    removeAllIngredientData: (state) => {
      state.ingrData = [];
    },
    updateIngredientData: (state, action) => {
      const bun = action.payload.find((obj: any) => obj.item.type === 'bun');
      const newArr = action.payload.filter((obj: any) => obj.item.type !== 'bun');
      state.ingrData = [...newArr, bun, bun];
    },
    handleModalClose: (state) => {
      state.isModalOpen = false;
    },
    handleModalOpen: (state) => {
      state.isModalOpen = true;
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

export const { handleModalClose, handleModalOpen, addIngredientData, removeIngredientData, updateIngredientData, removeAllIngredientData } = ingredientsSlice.actions;
export default ingredientsSlice.reducer;