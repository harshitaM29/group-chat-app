import { createSlice } from '@reduxjs/toolkit';

const token = sessionStorage.getItem('token')
const initialAuthState = {tokenId: null, isLoggedIn:!!token};

const authSlice = createSlice({
    name:'authentication',
    initialState:initialAuthState,
    reducers: {
        login(state, action) {
            state.tokenId = action.payload.idToken
            state.isLoggedIn = true
        },
        logout() {
            localStorage.clear();
            sessionStorage.clear();
        }
    }
});

export const authActions = authSlice.actions;

export default authSlice.reducer;