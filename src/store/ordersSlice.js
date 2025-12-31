import { createSlice } from '@reduxjs/toolkit';

const loadOrdersFromStorage = () => {
    try {
        const serializedOrders = localStorage.getItem('myntra_orders');
        if (serializedOrders === null) {
            return [];
        }
        return JSON.parse(serializedOrders);
    } catch (err) {
        return [];
    }
};

const saveOrdersToStorage = (orders) => {
    try {
        const serializedOrders = JSON.stringify(orders);
        localStorage.setItem('myntra_orders', serializedOrders);
    } catch (err) {
        // Ignore write errors
    }
};

const ordersSlice = createSlice({
    name: 'orders',
    initialState: {
        orders: loadOrdersFromStorage(),
    },
    reducers: {
        placeOrder: (state, action) => {
            const cartItems = action.payload;
            const newOrders = cartItems.map(item => ({
                ...item,
                orderId: `ORD${Date.now()}${Math.floor(Math.random() * 1000)}`,
                orderDate: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
                status: 'Placed',
                deliveryDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }), // 5 days later
            }));

            // Add new orders to the beginning of the list
            state.orders = [...newOrders, ...state.orders];
            saveOrdersToStorage(state.orders);
        },
    },
});

export const { placeOrder } = ordersSlice.actions;
export default ordersSlice.reducer;
