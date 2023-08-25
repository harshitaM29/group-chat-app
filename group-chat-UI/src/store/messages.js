import { createSlice } from '@reduxjs/toolkit';

const initialMessageState = {messages:[]};

const messageSlice = createSlice({
    name:'message',
    initialState:initialMessageState,
    reducers: {
        replaceMessages(state,action) {
            state.messages = action.payload.messages
        },
        addNewMessage(state,action) {
            state.messages.push({
                ...action.payload
            })
        }
    }
});

export const messageActions = messageSlice.actions;

export default messageSlice.reducer;