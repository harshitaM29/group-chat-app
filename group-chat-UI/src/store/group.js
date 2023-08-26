
import { createSlice } from '@reduxjs/toolkit';


const initialGroupState = {groupName:[], changed:false, groupusers:[]};

const groupSlice = createSlice({
    name:'group',
    initialState:initialGroupState,
    reducers: {
        replaceGroupName(state,action) {
            state.groupName = action.payload.groups;
        },
       addGroup(state,action) {
        state.changed = true;
       
        state.groupName.push({
            ...action.payload
        })
       },
       removeFromGroup(state,action) {
        console.log("ac",action.payload)
            state.changed = true;
            state.groupName = state.groupName.filter(group => group.id !== action.payload)
       },
       replaceGroupAdmin(state,action) {
        state.changed = true;
        const index = state.groupName.findIndex(group => group.id === action.payload.id);
        state.groupName[index].groupAdmin = action.payload.groupAdmin;
       },
       replaceGroupUsers(state,action) {
            state.groupusers = action.payload.users
       },
       addUser(state,action) {
        state.changed = true;
        state.groupusers.push({
            ...action.payload
        })
       },
       deleteUser(state,action) {
        state.changed = true;
        state.groupusers = state.groupusers.filter(item => item.id !== action.payload);
       }
    }
});

export const groupActions = groupSlice.actions;

export default groupSlice.reducer;