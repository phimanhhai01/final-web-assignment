import userActionTypes from "./user.actionTypes";

const userLoginStart = () => {
    return {
        type: userActionTypes.USER_LOGIN_START
    }
}

const userLoginError = (errorMessage) => {
    return {
        type: userActionTypes.USER_LOGIN_ERROR,
        payload: errorMessage
    }
}

const userLoginSuccess = (user) => {
    return {
        type: userActionTypes.USER_LOGIN_SUCCESS,
        payload: user,
    }
}

const userLogout = () => {
    return {
        type: userActionTypes.USER_LOGOUT
    }
}

const toggleConpletedDeclare = (current) => {
    return {
        type: userActionTypes.USER_TOGGLE_COMPLETED_DECLARE,
        payload: current
    }
}
const actions =  {
    toggleConpletedDeclare,
    userLoginStart,
    userLoginError,
    userLoginSuccess,
    userLogout,
}

export default actions;