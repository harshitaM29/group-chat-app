import { authActions } from "./auth";


export const setTokenId = (user) => {
    console.log(user);
    return (dispatch) => {
        if(user.token) {
            sessionStorage.setItem('token', user.token)
        }
        localStorage.setItem('name',user.name);
        localStorage.setItem('id',user.id)
        dispatch(authActions.login(user))
    }
}