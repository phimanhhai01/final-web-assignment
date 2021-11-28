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

export default {
    userLoginStart,
    userLoginError,
    userLoginSuccess,
    userLogout,
}