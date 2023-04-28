import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

let nextId = 4;
const fakeCategories = [
    { id: 1, name: 'Meats' },
    { id: 2, name: 'Vegetagles' },
    { id: 3, name: 'Packages' },
];

export const NEW_CATEGORY_TEMPLATE = {
    name: 'New Category',
};

const initialState = {
    entities: [],
    status: 'idle',
    error: null,
};

export const fetchCategoryList = createAsyncThunk('category/fetchCategoryList', async () => {
    // const response = await client.get('/fakeApi/posts')
    // return response.data
    return fakeCategories;
});

export const createCategory = createAsyncThunk('category/createCategory', async ({ data }) => {
    // const response = await client.post('/fakeApi/posts', initialPost);
    // return response.data;

    console.log('create category');

    return ({ ...data, id: nextId++ });
});

export const updateCategory = createAsyncThunk('category/updateCategory', async ({ data }) => {
    return data;
});

export const deleteCategory = createAsyncThunk('category/deleteCategory', async ({ id }) => {
    return id;
});

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
                console.log('create category fulfilled');
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
