import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import ChecklistAPI from '../api/checklistAPI';

export const NEW_PRODUCT_TEMPLATE = {
    name: 'New Product',
    category: null,
    tags: [],
};

const initialState = {
    entities: [],
    status: 'idle',
    error: null,
};

export const fetchProductList = createAsyncThunk('product/fetchProductList', async () => ChecklistAPI.fetchProducts());

export const createProduct = createAsyncThunk('product/createProduct', async ({ data }) => ChecklistAPI.createProduct(data));

export const updateProduct = createAsyncThunk('product/updateProduct', async ({ data }) => ChecklistAPI.updateProduct(data));

export const deleteProduct = createAsyncThunk('product/deleteProduct', async ({ id }) => ChecklistAPI.deleteProduct(id));

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: { },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProductList.fulfilled, (state, action) => {
                state.entities = action.payload;
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.entities.push(action.payload);
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.entities = state.entities.map(entity => entity.id === action.payload.id ? action.payload : entity);
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.entities = state.entities.filter(entity => entity.id !== action.payload);
            });
    }
});

export const selectProducts = (state) => state.product.entities;

export default productSlice.reducer;
