import {createSlice} from '@reduxjs/toolkit';
import toppingData from '../data/toppings.json'; // Adjust the path as necessary

const initialPizzaState = {
  crust: 'Default',
  toppings: [],
  price: 0, // default base price
};

const crustPrices = {
  Thin: 5,
  Default: 5,
  Thick: 6,
  Stuffed: 7,
};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState: initialPizzaState,
  reducers: {
    chooseCrust: (state, action) => {
      state.crust = action.payload;
    },
    addTopping: (state, action) => {
      state.toppings.push(action.payload);
    },
    removeTopping: (state, action) => {
      state.toppings = state.toppings.filter(
        topping => topping !== action.payload,
      );
    },
    calculateTotalPrice(state) {
      const crustPrice = crustPrices[state.crust];
      const toppingsPrice = state.toppings.reduce((total, topping) => {
        const toppingDetail = toppingData.toppings.find(
          t => t.name === topping,
        );
        return total + (toppingDetail ? toppingDetail.price : 0);
      }, 0);
      state.price = crustPrice + toppingsPrice;
    },
  },
});

export const {chooseCrust, addTopping, removeTopping, calculateTotalPrice} =
  pizzaSlice.actions;
export default pizzaSlice.reducer;
