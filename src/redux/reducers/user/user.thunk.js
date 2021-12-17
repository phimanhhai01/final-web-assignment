import actions from "./user.actions";

import { apiLoginUser, apiPersistUser } from "../../../api/apiUser";

export const userLoginAsync = ({username, password}) => {
    return dispatch => {
        dispatch(actions.userLoginStart());
        apiLoginUser({username, password})
        .then(response => {
        localStorage.setItem("token", response.data.jwt)
        dispatch(actions.userLoginSuccess(response.data.user_logedin))
        })
        .catch(error => {
            if(error.message === "Request failed with status code 400") return dispatch(actions.userLoginError("Password is incorrect"));
            return dispatch(actions.userLoginError(error.message));
        });
    }
}

export const userLogout = () => {
    return dispatch => {
        localStorage.removeItem("token");
        dispatch(actions.userLogout());
    }
}

export const userPersist = () => {
    return dispatch => {
        dispatch(actions.userLoginStart());
        apiPersistUser().then(response => {
            dispatch(actions.userLoginSuccess(response.data))
        })
        .catch(error => {dispatch(actions.userLoginError(error.message))});
    
    }
}

export const userFill = (data) => {
    return dispatch => {
        dispatch(actions.userLoginSuccess(data));
    }
}

export const userToggleCompletedDeclare = (current) => {
    return dispatch => {
        dispatch(actions.toggleConpletedDeclare(current));
    }
}