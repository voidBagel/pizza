//Order.js
import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  id: 0,
  items: [],
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addOrderItem(state, action) {
      state.items.push(action.payload);
    },
    removeOrderItem(state, action) {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    clearOrder(state) {
      state.items = [];
    },
  },
});

export const {addOrderItem, removeOrderItem, clearOrder} = orderSlice.actions;
export default orderSlice.reducer;
