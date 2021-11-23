import actionTypes from "./citizens.actionTypes";


const citizensLoadStart = () => {
    return {
        type: actionTypes.CITIZENS_LOAD_START
    };
}

const citizensLoadSuccess = (citizens) => {
    return {
        type: actionTypes.CITIZENS_LOAD_SUCCESS,
        payload: citizens
    }
}

const citizensLoadError = (errorMessage) => {
    return {
        type: actionTypes.CITIZENS_LOAD_ERROR,
        payload: errorMessage
    }
}

export default {
    citizensLoadStart,
    citizensLoadSuccess,
    citizensLoadError
}