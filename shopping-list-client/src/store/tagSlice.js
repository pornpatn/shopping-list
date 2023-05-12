import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

let nextId = 4;
const fakeTags = [
    { id: '1', name: 'Freezer' },
    { id: '2', name: 'Walkin' },
    { id: '3', name: 'Shelves' },
];

export const NEW_TAG_TEMPLATE = {
    name: 'New TAG',
};

const initialState = {
    entities: [],
    status: 'idle',
    error: null,
};

export const fetchTagList = createAsyncThunk('tag/fetchTagList', async () => {
    // const response = await client.get('/fakeApi/posts')
    // return response.data
    return fakeTags;
});

export const createTag = createAsyncThunk('tag/createTag', async ({ data }) => {
    // const response = await client.post('/fakeApi/posts', initialPost);
    // return response.data;

    console.log('create tag');

    return ({ ...data, id: '' + nextId++ });
});

export const updateTag = createAsyncThunk('tag/updateTag', async ({ data }) => {
    return data;
});

export const deleteTag = createAsyncThunk('tag/deleteTag', async ({ id }) => {
    return id;
});

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
                console.log('create tag fulfilled');
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
