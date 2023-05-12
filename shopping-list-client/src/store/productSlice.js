import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

let nextId = 4;
const fakeProducts = [
    {
        id: '1',
        name: 'Chicken',
        category: { id: '1', name: 'Meats' },
        tags: [ { id: '1', name: 'Freezer' } ],
        unit: 'case',
        description: 'Regular chicken',
    },
    {
        id: '2',
        name: 'Beef',
        category: { id: '1', name: 'Meats' },
        tags: [ { id: '1', name: 'Freezer' } ],
        unit: 'case',
        description: 'Flap meat',
    },
    {
        id: '3',
        name: 'Tomato',
        category: { id: '2', name: 'Vegetagles' },
        tags: [ { id: '2', name: 'Walkin' } ],
        unit: 'case',
        description: 'Roma Tomato',
    },
];

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

export const fetchProductList = createAsyncThunk('product/fetchProductList', async () => {
    // const response = await client.get('/fakeApi/posts')
    // return response.data
    return fakeProducts;
});

export const createProduct = createAsyncThunk('product/createProduct', async ({ data }) => {
    // const response = await client.post('/fakeApi/posts', initialPost);
    // return response.data;

    console.log('create product');

    return ({ ...data, id: nextId++ });
});

export const updateProduct = createAsyncThunk('product/updateProduct', async ({ data }) => {
    return data;
});

export const deleteProduct = createAsyncThunk('product/deleteProduct', async ({ id }) => {
    return id;
});

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
                console.log('create product fulfilled');
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
