import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import ChecklistAPI from '../api/checklistAPI';

export const NEW_CATEGORY_TEMPLATE = {
    name: 'New Category',
};

const initialState = {
    entities: [],
    status: 'idle',
    error: null,
};

export const fetchCategoryList = createAsyncThunk('category/fetchCategoryList', async () => ChecklistAPI.fetchCategories());

export const createCategory = createAsyncThunk('category/createCategory', async ({ data }) => ChecklistAPI.createCategory(data));

export const updateCategory = createAsyncThunk('category/updateCategory', async ({ data }) => ChecklistAPI.updateCategory(data));

export const deleteCategory = createAsyncThunk('category/deleteCategory', async ({ id }) => ChecklistAPI.deleteCategory(id));

export const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: { },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategoryList.fulfilled, (state, action) => {
                state.entities = action.payload;
            })
            .addCase(createCategory.fulfilled, (state, action) => {
                state.entities.push(action.payload);
            })
            .addCase(updateCategory.fulfilled, (state, action) => {
                state.entities = state.entities.map(entity => entity.id === action.payload.id ? action.payload : entity);
            })
            .addCase(deleteCategory.fulfilled, (state, action) => {
                state.entities = state.entities.filter(entity => entity.id !== action.payload);
            });
    }
});

export const selectCategories = (state) => state.category.entities;

export default categorySlice.reducer;
