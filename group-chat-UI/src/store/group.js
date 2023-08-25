
import { createSlice } from '@reduxjs/toolkit';


const initialGroupState = {groupName:[], changed:false};

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
       }
    }
});

export const groupActions = groupSlice.actions;

export default groupSlice.reducer;