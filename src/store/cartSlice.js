import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartItems: [],
    },
    reducers: {
        addToCart: (state, action) => {
            const exists = state.cartItems.find(item => item.id === action.payload.id);
            if (exists) {
                exists.quantity += 1;
            } else {
                state.cartItems.push({ ...action.payload, quantity: 1 });
            }
        },
        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter(item => item.id !== action.payload);
        },
        updateQuantity: (state, action) => {
            const { id, qty } = action.payload;
            const item = state.cartItems.find(item => item.id === id);
            if (item) {
                item.quantity = Math.max(1, qty);
            }
        },
        clearCart: (state) => {
            state.cartItems = [];
        }
    },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
// For compatibility with parts of the app still using 'bag' terminology
export const addToBag = addToCart;
export const removeFromBag = removeFromCart;
export const clearBag = clearCart;

export default cartSlice.reducer;
