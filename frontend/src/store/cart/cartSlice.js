import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart: [],
    },
    reducers: {
        addItem: (state, action) => {
            const addedItem = action.payload.cart;

            const doubleItem = state.cart.find((item, index) => {
                if (addedItem._id === item._id) return true;
                return false
            });

            if(!doubleItem){

                state.cart.push(action.payload);
            }
        }
    }
});

export const { addItem } = cartSlice.actions;
export default cartSlice.reducer;