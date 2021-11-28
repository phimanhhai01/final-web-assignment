import userInitialStates from "./user.initialStates";
import userActionTypes from "./user.actionTypes"

const userReducer = (state = userInitialStates, {type, payload}) => {
    switch(type){
        case userActionTypes.USER_LOGIN_START:
            return {
                ...state,
                isLoading: true,
            }
        case userActionTypes.USER_LOGIN_ERROR: 
            return {
                ...state,
                isLoading: false,
                errorMessage: payload
            }
        case userActionTypes.USER_LOGIN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                currentUser: payload
            }
        case userActionTypes.USER_LOGOUT:
            return {
                ...state,
                currentUser: null,
                errorMessage: null,
            }
        default:
            return state;
    }
}

export default userReducer;