import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import ChecklistAPI from '../api/checklistAPI';

export const NEW_MARKET_TEMPLATE = {
    name: 'New Market',
};

const initialState = {
    entities: [],
    status: 'idle',
    error: null,
};

export const fetchMarketList = createAsyncThunk('market/fetchMarketList', async () => ChecklistAPI.fetchMarkets());

export const createMarket = createAsyncThunk('market/createMarket', async ({ data }) => ChecklistAPI.createMarket(data));

export const updateMarket = createAsyncThunk('market/updateMarket', async ({ data }) => ChecklistAPI.updateMarket(data));

export const deleteMarket = createAsyncThunk('market/deleteMarket', async ({ id }) => ChecklistAPI.deleteMarket(id));

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
