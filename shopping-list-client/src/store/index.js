import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from './categorySlice';
import tagReducer from './tagSlice';
import productReducer from './productSlice';
import marketReducer from './marketSlice';

export const store = configureStore({
    reducer: {
        category: categoryReducer,
        tag: tagReducer,
        product: productReducer,
        market: marketReducer,
    },
});
