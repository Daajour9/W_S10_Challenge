import { createSlice } from "@reduxjs/toolkit";

const pizzaSlice = createSlice({
    name: 'pizza',
    initialState: {
        size: 'All'
    },
    reducers: {
        updateFilter(state, action) {
            state.size = action.payload
        }
    }
})

export const {
    updateFilter
} = pizzaSlice.actions

export default pizzaSlice.reducer