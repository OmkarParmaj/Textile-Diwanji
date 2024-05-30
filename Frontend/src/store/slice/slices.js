import { createSlice } from '@reduxjs/toolkit';




const billamount = createSlice({
    name:"billamount",
    initialState:{
        value: 0,
        packing: [],
        check:"false",

    },
    reducers:{
        bill: (state, action) => {
            state.value = action.payload;
        },
        packing: (state, action) => {
            state.packing = action.payload;
        },
        hello:((state, action) => {
            state.check = action.payload;
        })
    },
});



export default billamount.reducer;

export const {bill, packing, hello} = billamount.actions;


