import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    // cart: [],
    cart: [
        // {
        //     pizzaId: 12,
        //     name: 'Mediterranean',
        //     quantity: 2,
        //     unitPrice: 16,
        //     totalPrice: 32,
        // },
    ],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action) {
            // payload = newItem
            state.cart.push(action.payload);
        },
        deleteItem(state, action) {
            // payload = pizzaId
            state.cart = state.cart.filter(
                (pizza) => pizza.pizzaId !== action.payload
            );
        },
        increaseItemQuantity(state, action) {
            // payload = pizzaId
            const pizza = state.cart.find(
                (pizza) => pizza.pizzaId === action.payload
            );
            pizza.quantity++;
            pizza.totalPrice = pizza.quantity * pizza.unitPrice;
        },
        decreaseItemQuantity(state, action) {
            // payload = pizzaId
            const pizza = state.cart.find(
                (pizza) => pizza.pizzaId === action.payload
            );

            pizza.quantity--;
            pizza.totalPrice = pizza.quantity * pizza.unitPrice;

            if (pizza.quantity === 0)
                cartSlice.caseReducers.deleteItem(state, action);
        },
        clearCart(state, action) {
            state.cart = [];
        },
    },
});

export const {
    addItem,
    deleteItem,
    increaseItemQuantity,
    decreaseItemQuantity,
    clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

export const getCart = (state) => state.cart.cart;

export const getTotalCartQuantity = (state) =>
    state.cart.cart.reduce((sum, item) => sum + item.quantity, 0);

export const getTotalCartPrice = (state) =>
    state.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0);

export const getCurrentQuantityById = (id) => (state) =>
    state.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0;
