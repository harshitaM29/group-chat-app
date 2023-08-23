import { authActions } from "./auth";


export const setTokenId = (user) => {
    console.log(user);
    return (dispatch) => {
        if(user.token) {
            sessionStorage.setItem('token', user.token)
        }
        dispatch(authActions.login(user))
    }
}