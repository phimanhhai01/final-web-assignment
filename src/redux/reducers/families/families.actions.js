import actionTypes from "./families.actionTypes";


const familiesLoadStart = () => {
    return {
        type: actionTypes.FAMILIES_LOAD_START
    };
}

const familiesLoadSuccess = (families) => {
    return {
        type: actionTypes.FAMILIES_LOAD_SUCCESS,
        payload: families
    }
}

const familiesLoadError = (errorMessage) => {
    return {
        type: actionTypes.FAMILIES_LOAD_ERROR,
        payload: errorMessage
    }
}

export default {
    familiesLoadStart,
    familiesLoadSuccess,
    familiesLoadError
}