import {configureStore} from '@reduxjs/toolkit';
import pizzaReducer from './reducers/pizzaSlice';
import orderReducer from './reducers/orderSlice';

const store = configureStore({
  reducer: {
    pizza: pizzaReducer,
    order: orderReducer,
  },
});

export default store;
