import { authActions } from "./auth";


export const setTokenId = (user) => {
    console.log(user);
    return (dispatch) => {
        if(user.token) {
            localStorage.setItem('token', user.token)
        }
        dispatch(authActions.login(user))
    }
}