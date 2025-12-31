import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    selectedBrands: [],
    selectedColors: [],
    selectedPriceRanges: [],
    selectedDiscount: null,
    sortBy: "recommended",
};

const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setSelectedBrands: (state, action) => {
            state.selectedBrands = action.payload;
        },
        setSelectedColors: (state, action) => {
            state.selectedColors = action.payload;
        },
        setSelectedPriceRanges: (state, action) => {
            state.selectedPriceRanges = action.payload;
        },
        setSelectedDiscount: (state, action) => {
            state.selectedDiscount = action.payload;
        },
        setSortBy: (state, action) => {
            state.sortBy = action.payload;
        },
        clearAllFilters: (state) => {
            state.selectedBrands = [];
            state.selectedColors = [];
            state.selectedPriceRanges = [];
            state.selectedDiscount = null;
        }
    }
});

export const {
    setSelectedBrands,
    setSelectedColors,
    setSelectedPriceRanges,
    setSelectedDiscount,
    setSortBy,
    clearAllFilters
} = filterSlice.actions;

export default filterSlice.reducer;
