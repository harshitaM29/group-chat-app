import axios from "axios";
import { groupActions } from "./group";

export const fetchAllGroups = (token) => {
    return async(dispatch) => {
        try {
            const response = await axios.get(`http://localhost:4000/group/getAllGroups`, {
            headers: {"Authorization" : token }
        });
        dispatch(groupActions.replaceGroupName({
            groups: response.data || []
        }))
        } catch (error) {
            
        }
    }
}

export const createGroup = (groupname,users,token) => {
    return async(dispatch) => {
        try {
            const response = await axios.post(`http://localhost:4000/group/creategroup`,{name:groupname, users:users}, {
            headers: {"Authorization" : token }
        });
        console.log(response.data)
        dispatch(groupActions.addGroup(response.data[0]));
        } catch (error) {
            
        }
    }
}