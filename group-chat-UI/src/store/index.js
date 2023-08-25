
import authReducer from './auth';
import groupReducer from './group';

import { configureStore } from '@reduxjs/toolkit';

    const store = configureStore({
        reducer: {auth:authReducer, group:groupReducer}
    });
    
    export default store;