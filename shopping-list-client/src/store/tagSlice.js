import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import ChecklistAPI from '../api/checklistAPI';

export const NEW_TAG_TEMPLATE = {
    name: 'New TAG',
};

const initialState = {
    entities: [],
    status: 'idle',
    error: null,
};

export const fetchTagList = createAsyncThunk('tag/fetchTagList', async () => ChecklistAPI.fetchTags());

export const createTag = createAsyncThunk('tag/createTag', async ({ data }) => ChecklistAPI.createTag(data));

export const updateTag = createAsyncThunk('tag/updateTag', async ({ data }) => ChecklistAPI.updateTag(data));

export const deleteTag = createAsyncThunk('tag/deleteTag', async ({ id }) => ChecklistAPI.deleteTag(id));

export const tagSlice = createSlice({
    name: 'tag',
    initialState,
    reducers: { },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTagList.fulfilled, (state, action) => {
                state.entities = action.payload;
            })
            .addCase(createTag.fulfilled, (state, action) => {
                state.entities.push(action.payload);
            })
            .addCase(updateTag.fulfilled, (state, action) => {
                state.entities = state.entities.map(entity => entity.id === action.payload.id ? action.payload : entity);
            })
            .addCase(deleteTag.fulfilled, (state, action) => {
                state.entities = state.entities.filter(entity => entity.id !== action.payload);
            });
    }
});

export const selectTags = (state) => state.tag.entities;

export default tagSlice.reducer;
