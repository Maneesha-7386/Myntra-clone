import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllProducts } from "../api/productsApi";
import { generateMockData } from "../utils/mockDataGenerator";

export const fetchProducts = createAsyncThunk(
    "products/fetchProducts",
    async () => {
        const data = await getAllProducts();
        return data;
    }
);


const productsSlice = createSlice({
    name: "products",
    initialState: {
        items: {},
        loading: false,
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.items = action.payload;
                state.loading = false;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});


export default productsSlice.reducer;

