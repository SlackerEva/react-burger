import { createSlice } from '@reduxjs/toolkit';
import  { fetchIngredients } from '../actions/actions';
import { TIngrData, TIngredients } from '../../types/types';

interface IIngredientState {
  ingredients: TIngredients[],
  ingrData: TIngrData[],
  isModalOpen: boolean,
}

export const initialState: IIngredientState = {
  ingredients: [],
  ingrData: [],
  isModalOpen: false,
}

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    addIngredientData: (state, action) => {
      state.ingrData =  (action.payload.item.type === 'bun' && state.ingrData.length === 0) ? [...state.ingrData, action.payload] : state.ingrData;
      state.ingrData =  (action.payload.item.type === 'bun' && state.ingrData.length !== 0) ? [...state.ingrData.filter((obj: TIngrData) => obj.item.type !=='bun'), action.payload] : state.ingrData;
      state.ingrData =  (action.payload.item.type !== 'bun' && state.ingrData.length !== 0) ? [...state.ingrData, action.payload] : state.ingrData;
    },
    removeIngredientData: (state, action) => {
      state.ingrData = state.ingrData.filter((item) => item.dragId !== action.payload);
    },
    removeAllIngredientData: (state) => {
      state.ingrData = [];
    },
    updateIngredientData: (state, action) => {
      const bun = action.payload.find((obj: TIngrData) => obj.item.type === 'bun');
      const newArr = action.payload.filter((obj: TIngrData) => obj.item.type !== 'bun');
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
  },
})

export const { handleModalClose, handleModalOpen, addIngredientData, removeIngredientData, updateIngredientData, removeAllIngredientData } = ingredientsSlice.actions;
export default ingredientsSlice.reducer;