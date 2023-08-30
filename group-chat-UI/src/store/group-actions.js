import axios from "axios";
import { groupActions } from "./group";
import { chatActions } from "./chat";
import { baseURL } from "../constants";

export const fetchAllGroups = (token) => {
    return async(dispatch) => {
        try {
            const response = await axios.get(`${baseURL}/group/getAllGroups`, {
            headers: {"Authorization" : token }
        });
        console.log(response.data)
        dispatch(groupActions.replaceGroupName({
            groups: response.data[0].groups || []
        }))
        } catch (error) {
            
        }
    }
}

export const createGroup = (groupname,users,token) => {
    return async(dispatch) => {
        try {
            const response = await axios.post(`${baseURL}/group/creategroup`,{name:groupname, users:users}, {
            headers: {"Authorization" : token }
        });
        console.log(response.data)
        dispatch(groupActions.addGroup(response.data[0]));
        } catch (error) {
            
        }
    }
}

export const fetchAllGroupUsers = (token,groupId) => {
    return async(dispatch) => {
        try {
            const response = await axios.get(`${baseURL}/group/getallgroupusers/${groupId}`,{
                headers: {"Authorization" : token }
            });
            dispatch(groupActions.replaceGroupUsers({
                users: response.data[0].users || []
            }))
        } catch (error) {
            
        }
    }
};

export const addNewUser = (token,groupId,userId) => {
    return async(dispatch) => {
        try {
            const response = await axios.post(`${baseURL}/admin/addnewuser`,{id:groupId, userId:userId},{
                headers: {"Authorization" : token }
            });
           dispatch(groupActions.addUser(response.data))
        } catch (error) {
            
        }
    }
}
export const removeUser = (token,groupId,userId) => {
   
    return async(dispatch) => {
        try {
            
            const response = await axios.delete(`${baseURL}/admin/removeuser?id=${groupId}&userId=${userId}`,{
                headers: {"Authorization" : token }
            },
           
            
           );
        
          
        } catch (error) {
            
        }
    }
}

export const changeAdmin = (token,groupId,userId) => {
    return async(dispatch) => {
        try {
            const response = await axios.put(`${baseURL}/admin/changeadmin`,{id:groupId,userId:userId}, {
                headers: {"Authorization" : token }
            });
            
            dispatch(groupActions.replaceGroupAdmin(response.data));
            dispatch(chatActions.setSelectedChat(response.data))
        } catch (error) {
            
        }
    }
};