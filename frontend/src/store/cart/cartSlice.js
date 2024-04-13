import { createSlice } from '@reduxjs/toolkit';
import { localStorageConfig } from '../../config/localStorageConfig';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart: [],
        isNewItem: false,
        isOldItem: false,
    },
    reducers: {
        addItem: (state, action) => {
            const addedItem = { ...action.payload };
            var doubledItemIndex;

            const doubleItem = state.cart.find((item, index) => {
                if (addedItem._id === item._id) {
                    doubledItemIndex = index;
                    return item;
                }
                return false
            });

            if (!doubleItem) {
                addedItem.count = 1;
                addedItem.totalPrice = addedItem.price;
                state.cart.push(addedItem);
                state.isNewItem = true;
            } else {
                state.cart[doubledItemIndex].count++;
                state.cart[doubledItemIndex].totalPrice = state.cart[doubledItemIndex].price * state.cart[doubledItemIndex].count;
                state.isOldItem = true;
            };
        },
        removeItem: (state, action) => {
            state.cart.splice(action.payload, 1)
            if(!state.cart.length) localStorage.removeItem(localStorageConfig.CART);
        },
        setCart: (state, action) => {
            state.cart = action.payload;
        },
        setNewOld: (state) => {
            state.isNewItem = false;
            state.isOldItem = false;
        },
        handleCountItem: (state, action) => {
            const item = { ...action.payload };

            const count = item.isIncrease ? state.cart[item.index].count + 1 : state.cart[item.index].count - 1;
            state.cart[item.index].count = count < 1 ? 1 : count;
            state.cart[item.index].totalPrice = state.cart[item.index].price * state.cart[item.index].count;

        }
    }
});

export const { addItem, removeItem, setCart, setNewOld, handleCountItem  } = cartSlice.actions;
export default cartSlice.reducer;