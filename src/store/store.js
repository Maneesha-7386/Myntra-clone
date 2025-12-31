import { configureStore } from '@reduxjs/toolkit';
import wishlistReducer from './wishlistSlice';
import cartReducer from './cartSlice';
import productsReducer from './productsSlice';
import filterReducer from './filterSlice';
import authReducer from './authSlice';
import ordersReducer from './ordersSlice';

export const store = configureStore({
    reducer: {
        wishlist: wishlistReducer,
        cart: cartReducer,
        bag: cartReducer, // Alias for backward compatibility
        products: productsReducer,
        filters: filterReducer,
        auth: authReducer,
        orders: ordersReducer,
    },
});

export default store;
