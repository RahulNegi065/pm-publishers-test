import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface CartState {
    products: {
      [id: string]: number;
    };
}
  
const initialState: CartState = {
    products: {},
};

const cartSlice = createSlice({
    name: 'cartCounter',
    initialState,
    reducers: {
        increment: (state, action: PayloadAction<{id:string, qty:number}>) => {
            const { id, qty } = action.payload;
            if (state.products[id]) {
                state.products[id] += qty;
            } else {
                state.products[id] = qty;
            }
        },
        decrement: (state, action: PayloadAction<{id:string, qty:number}>) => {
            const { id, qty } = action.payload;
            if (state.products[id]>1) {
                state.products[id] -= qty;
            } else {
                delete state.products[id];
            }
        },
    }
})

export const { increment, decrement } = cartSlice.actions;
export default cartSlice.reducer;