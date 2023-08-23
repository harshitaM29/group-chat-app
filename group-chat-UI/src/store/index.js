
import authReducer from './auth';
import chatReducer from './chats';

import { configureStore } from '@reduxjs/toolkit';

    const store = configureStore({
        reducer: {auth:authReducer, chats:chatReducer}
    });
    
    export default store;