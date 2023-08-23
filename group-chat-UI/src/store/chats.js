import { createSlice } from '@reduxjs/toolkit';

const chatInitialState = {sendChats:[],receivedChats:[]}

const chatSlice = createSlice({
    name:'chats',
    initialState:chatInitialState,
    reducers: {
        sendChat(state,action) {
            state.sendChats.push({
                ...action.payload
            })
        }
    }
});

export const chatActions = chatSlice.actions;

export default chatSlice.reducer;