import { chatActions } from './chats';
import axios from 'axios';

export const sendMessage = (message,token) => {
    return async(dispatch) => {
        try {
            const response = axios.post('http://localhost:4000/chat/sendChat', { message: message }, {
                headers: {"Authorization" : token }
            });
            dispatch(chatActions.sendChat(response.data))
        } catch(err){
            throw new Error(err);
        }
    }
}