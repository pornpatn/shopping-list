import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

let nextId = 4;
const fakeChecklists = [
    {
        id: '1',
        name: 'Thai Market',
        items: [
            {
                product: { id: '1', name: 'Chicken' },
                qty: 5,
                checked: true
            },
            {
                product: { id: '2', name: 'Beef' },
                qty: 2,
                checked: false
            },
        ],
        filters: [],
        status: 'in-progress',
        description: 'Checklist note',
        created: '2023-05-04T18:31:07.890Z',
        modified: '2023-05-04T18:31:07.890Z',
    },
    {
        id: '2',
        name: 'Wonder Market',
        items: [
            {
                product: { id: '1', name: 'Chicken' },
                qty: 8,
                checked: true
            },
            {
                product: { id: '2', name: 'Beef' },
                qty: 4,
                checked: false
            },
        ],
        filters: [],
        status: 'in-progress',
        description: 'Dummy checklist',
        created: '2023-05-02T18:31:07.890Z',
        modified: '2023-05-02T18:31:07.890Z',
    },
    {
        id: '3',
        name: 'Wonder Market',
        items: [
            {
                id: '2',
                product: { id: '2', name: 'Beef' },
                qty: 0,
                checked: true
            },
            {
                id: '1',
                product: { id: '1', name: 'Chicken' },
                qty: 10,
                checked: true
            },
        ],
        filters: [],
        status: 'in-progress',
        description: 'Dummy checklist',
        created: '2023-05-01T18:31:07.890Z',
        modified: '2023-05-01T18:31:07.890Z',
    },
];

export const NEW_CHECKLIST_TEMPLATE = {
    name: 'New Checklist',
    items: [],
    filters: [],
    status: 'in-progress',
    created: null,
    modified: null,
};

const initialState = {
    entities: [],
    currentChecklistId: 0,
    currentChecklist: null,
    status: 'idle',
    error: null,
};

export const fetchChecklistList = createAsyncThunk('checklist/fetchChecklistList', async ({ filter }) => {
    // const response = await client.get('/fakeApi/posts')
    // return response.data
    console.log('fetch checklist filter: ', filter);
    return fakeChecklists;
});

export const fetchChecklistById = createAsyncThunk('checklist/fetchChecklistById', async ({ checklistId }) => {
    // const response = await client.get('/fakeApi/posts')
    // return response.data
    return fakeChecklists.find(checklist => checklist.id === checklistId) || ({ ...NEW_CHECKLIST_TEMPLATE, id: checklistId });
});

export const createChecklist = createAsyncThunk('checklist/createChecklist', async ({ data }) => {
    // const response = await client.post('/fakeApi/posts', initialPost);
    // return response.data;

    console.log('create checklist');

    return ({ ...data, id: '' + nextId++ });
});

export const updateChecklist = createAsyncThunk('checklist/updateChecklist', async ({ data }) => {
    return data;
});

export const deleteChecklist = createAsyncThunk('checklist/deleteChecklist', async ({ id }) => {
    return id;
});

export const checklistSlice = createSlice({
    name: 'checklist',
    initialState,
    reducers: { },
    extraReducers: (builder) => {
        builder
            .addCase(fetchChecklistList.fulfilled, (state, action) => {
                console.log('checklists fullfilled: ', action.payload);
                state.entities = action.payload;

                if (state.currentChecklist === null) {
                    state.currentChecklist = action.payload[0];
                    state.currentChecklistId = action.payload[0].id;
                }
            })
            .addCase(fetchChecklistById.fulfilled, (state, action) => {
                console.log('checklist by id fullfilled: ', action.payload);
                state.currentChecklist = action.payload;
                state.currentChecklistId = action.payload?.id;
            })
            .addCase(createChecklist.fulfilled, (state, action) => {
                console.log('create checklist fulfilled');
                state.entities.push(action.payload);
            })
            .addCase(updateChecklist.fulfilled, (state, action) => {
                state.entities = state.entities.map(entity => entity.id === action.payload.id ? action.payload : entity);
            })
            .addCase(deleteChecklist.fulfilled, (state, action) => {
                state.entities = state.entities.filter(entity => entity.id !== action.payload);
            });
    }
});

export const selectChecklists = (state) => state.checklist.entities;

export const selectCurrentChecklist = (state) => state.checklist.currentChecklist;

export const selectOtherInProgressChecklists = (state) => state.checklist.entities.slice(1);

export const selectPreviousChecklists = (state) => state.checklist.entities;

export default checklistSlice.reducer;
