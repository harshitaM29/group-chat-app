import { createSlice } from '@reduxjs/toolkit';

const initialChatState = {selectedChat:""};

const chatSlice = createSlice({
    name:'chats',
    initialState:initialChatState,
    reducers: {
       setSelectedChat(state,action) {
        
            state.selectedChat = action.payload
       }
    }
});

export const chatActions = chatSlice.actions;

export default chatSlice.reducer;