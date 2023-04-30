import { initialState, addIngredientData, removeIngredientData, removeAllIngredientData, updateIngredientData, handleModalClose, handleModalOpen }  from "./reducers";
import ingredientsSlice  from "./reducers";
import { fetchIngredients } from "../actions/actions";

const ingredientData = [{
  "_id": "60666c42cc7b410027a1a9b1",
  "name": "Краторная булка N-200i",
  type: "bun",
  "proteins": 80,
  "fat": 24,
  "carbohydrates": 53,
  "calories": 420,
  "price": 1255,
  "image": "https://code.s3.yandex.net/react/code/bun-02.png",
  "image_mobile": "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
  "image_large": "https://code.s3.yandex.net/react/code/bun-02-large.png",
  "__v": 0
}];

const ingredientDataObj = {
  "_id": "60666c42cc7b410027a1a9b1",
  "name": "Краторная булка N-200i",
  type: "bun",
  "proteins": 80,
  "fat": 24,
  "carbohydrates": 53,
  "calories": 420,
  "price": 1255,
  "image": "https://code.s3.yandex.net/react/code/bun-02.png",
  "image_mobile": "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
  "image_large": "https://code.s3.yandex.net/react/code/bun-02-large.png",
  "__v": 0
};

const ingrDataState = [{
  dragId: 'bdb02271-da41-b72e-c877-4952beed7fa2',
  item: ingredientDataObj,
}];

describe("ingredient slice", () => {
  it('should return the initial state', () => {
    expect(ingredientsSlice(undefined, {type: undefined})).toEqual(initialState)
  });

  it('should handle addIngredientData', () => {
    const action = {
      type: addIngredientData,
      payload: {
        dragId: 'bdb02271-da41-b72e-c877-4952beed7fa2',
        item: ingredientDataObj,
      },
    };
    const expectedState = { ingredients: [], ingrData: ingrDataState, isModalOpen: false };
    expect(ingredientsSlice(initialState, action)).toEqual(expectedState);
  });

  it('should handle removeIngredientData', () => {
    const action = {
      type: removeIngredientData,
      payload: ingrDataState,
    };
    const expectedState = { ingredients: [], ingrData: [], isModalOpen: false };
    expect(ingredientsSlice(initialState, action)).toEqual(expectedState);
  });

  it('should handle removeAllIngredientData', () => {
    const expectedState = { ingredients: [], ingrData: [], isModalOpen: false };
    expect(ingredientsSlice(initialState, removeAllIngredientData())).toEqual(expectedState);
  });

  it('should handle updateIngredientData', () => {
    const action = {
      type: updateIngredientData,
      payload: ingrDataState,
    };
    const arrIngr = [
      {dragId: 'bdb02271-da41-b72e-c877-4952beed7fa2', item: ingredientDataObj},
      {dragId: 'bdb02271-da41-b72e-c877-4952beed7fa2', item: ingredientDataObj}
    ];
    const expectedState = { ingredients: [], ingrData: arrIngr, isModalOpen: false };
    expect(ingredientsSlice(initialState, action)).toEqual(expectedState);
  });

  it('should handle handleModalClose', () => {
    const expectedState = { ingredients: [], ingrData: [], isModalOpen: false };
    expect(ingredientsSlice(initialState, handleModalClose())).toEqual(expectedState);
  });

  it('should handle handleModalOpen', () => {
    const expectedState = { ingredients: [], ingrData: [], isModalOpen: true };
    expect(ingredientsSlice(initialState, handleModalOpen())).toEqual(expectedState);
  });

  it("should handle fetchIngredients.fulfilled", () => {
    const action = {
      type: fetchIngredients.fulfilled.type,
      payload: { data: [ingredientData] },
    };
    const expectedState = { ingredients: [ingredientData], ingrData: [], isModalOpen: false };
    expect(ingredientsSlice(initialState, action)).toEqual(expectedState);
  });
});