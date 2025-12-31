import { createSlice } from '@reduxjs/toolkit';

const loadWishlist = () => {
    try {
        const saved = localStorage.getItem("myntra_wishlist");
        return saved ? JSON.parse(saved) : [];
    } catch (e) {
        return [];
    }
};

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState: {
        wishlistItems: loadWishlist(),
    },
    reducers: {
        addToWishlist: (state, action) => {
            const exists = state.wishlistItems.find(item => item.id === action.payload.id);
            if (!exists) {
                state.wishlistItems.push(action.payload);
                localStorage.setItem("myntra_wishlist", JSON.stringify(state.wishlistItems));
            }
        },
        removeFromWishlist: (state, action) => {
            state.wishlistItems = state.wishlistItems.filter(item => item.id !== action.payload);
            localStorage.setItem("myntra_wishlist", JSON.stringify(state.wishlistItems));
        },
        toggleWishlist: (state, action) => {
            const index = state.wishlistItems.findIndex(item => item.id === action.payload.id);
            if (index >= 0) {
                state.wishlistItems.splice(index, 1);
            } else {
                state.wishlistItems.push(action.payload);
            }
            localStorage.setItem("myntra_wishlist", JSON.stringify(state.wishlistItems));
        },
    },
});

export const { addToWishlist, removeFromWishlist, toggleWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
