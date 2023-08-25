import { messageActions } from "./messages";
import axios from "axios";

export const fetchMessages = (token,groupId) => {
  
    return async(dispatch) => {
        try {
            const response = await axios.get(`http://localhost:4000/message/fetchMessages/${groupId}`, {
                headers: { "Authorization": token}
            });
            dispatch(messageActions.replaceMessages({
                messages: response.data || []
            }))
        } catch (error) {
            
        }
    }
    }


export const createMessage = (token,id,message) => {
    return async(dispatch) => {
        try {
            const response = await axios.post('http://localhost:4000/message/sendMessage',{id:id,message:message}, {
                headers: { "Authorization": token}
            });
            dispatch(messageActions.addNewMessage(response.data))
        } catch (error) {
            
        }
    }
}