import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

let nextId = 7;
const fakeMarkets = [
    { id: 1, name: 'Thai Market N & N' },
    { id: 2, name: 'Wonder Produce' },
    { id: 3, name: 'S.J Distributors' },
    { id: 4, name: 'Costco' },
    { id: 5, name: 'Sysco' },
    { id: 6, name: 'Restaurant Depot' },
];

export const NEW_MARKET_TEMPLATE = {
    name: 'New Market',
};

const initialState = {
    entities: [],
    status: 'idle',
    error: null,
};

export const fetchMarketList = createAsyncThunk('market/fetchMarketList', async () => {
    // const response = await client.get('/fakeApi/posts')
    // return response.data
    return fakeMarkets;
});

export const createMarket = createAsyncThunk('market/createMarket', async ({ data }) => {
    // const response = await client.post('/fakeApi/posts', initialPost);
    // return response.data;

    console.log('create market');

    return ({ ...data, id: nextId++ });
});

export const updateMarket = createAsyncThunk('market/updateMarket', async ({ data }) => {
    return data;
});

export const deleteMarket = createAsyncThunk('market/deleteMarket', async ({ id }) => {
    return id;
});

export const marketSlice = createSlice({
    name: 'market',
    initialState,
    reducers: { },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMarketList.fulfilled, (state, action) => {
                state.entities = action.payload;
            })
            .addCase(createMarket.fulfilled, (state, action) => {
                console.log('create market fulfilled');
                state.entities.push(action.payload);
            })
            .addCase(updateMarket.fulfilled, (state, action) => {
                state.entities = state.entities.map(entity => entity.id === action.payload.id ? action.payload : entity);
            })
            .addCase(deleteMarket.fulfilled, (state, action) => {
                state.entities = state.entities.filter(entity => entity.id !== action.payload);
            });
    }
});

export const selectMarkets = (state) => state.market.entities;

export default marketSlice.reducer;
