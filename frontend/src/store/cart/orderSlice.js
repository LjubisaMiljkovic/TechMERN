import { createSlice } from '@reduxjs/toolkit';

const orderSlice = createSlice({
    name: 'order',
    initialState: {
        currentStep: 1,
    },
    reducers: {
   handleCurrentStep: (state,actions) => {
    state.currentStep = state.currentStep + actions.payload;
   }
    }
});

export const { handleCurrentStep} = orderSlice.actions;
export default orderSlice.reducer;