import { configureStore, createSlice } from '@reduxjs/toolkit';
import billamount from './slice/slices';




export const store = configureStore({

    reducer: {
        value : billamount,
    }

})





