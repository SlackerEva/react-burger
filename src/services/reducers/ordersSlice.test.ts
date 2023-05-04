import { initialState, clearOrder }  from "./ordersSlice";
import ordersSlice  from "./ordersSlice";
import { fetchOrder } from "../actions/actions";

describe("order slice", () => {
  it('should return the initial state', () => {
    expect(ordersSlice(undefined, {type: undefined})).toEqual(initialState);
  });

  it('should handle clearOrder', () => {
    const expectedState = {
      orderNum: null,
      status: '',
    };
    expect(ordersSlice(initialState, clearOrder())).toEqual(expectedState);
 });

  it("should handle fetchIngredients.fulfilled", () => {
    const action = {
      type: fetchOrder.fulfilled.type,
      payload: { order: {number: 123, status: 'success'} },
    };
    const expectedState = {
      orderNum: 123,
      status: 'success',
    };
    expect(ordersSlice(initialState, action)).toEqual(expectedState);
  });
});