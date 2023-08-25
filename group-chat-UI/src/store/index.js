
import authReducer from './auth';
import groupReducer from './group';
import chatReducer from './chat';
import messagesReducer from './messages';
import { configureStore } from '@reduxjs/toolkit';

    const store = configureStore({
        reducer: {auth:authReducer, group:groupReducer,chat:chatReducer,messages:messagesReducer}
    });
    
    export default store;