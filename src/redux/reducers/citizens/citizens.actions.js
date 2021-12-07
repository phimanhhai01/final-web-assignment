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
const citizenIdLoadStart = () => {
    return {
        type: actionTypes.CITIZEN_ID_LOAD_START
    };
}
const citizenIdLoadSuccess = (singleCitizen) => {
    return {
        type: actionTypes.CITIZEN_ID_LOAD_SUCCESS,
        payload: singleCitizen
    }
}

const citizenIdLoadError = (errorMessage) => {
    return {
        type: actionTypes.CITIZEN_ID_LOAD_ERROR,
        payload: errorMessage
    }
}

export default {
    citizensLoadStart,
    citizensLoadSuccess,
    citizensLoadError,
    citizenIdLoadStart,
    citizenIdLoadSuccess,
    citizenIdLoadError
}