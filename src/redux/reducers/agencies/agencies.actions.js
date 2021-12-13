import actionTypes from "./agencies.actionTypes";


const agenciesLoadStart = () => {
    return {
        type: actionTypes.AGENCIES_LOAD_START
    };
}

const agenciesLoadSuccess = (agencies) => {
    console.log("🚀 ~ file: agencies.actions.js ~ line 17 ~ agenciesLoadSuccess ~ agencies", agencies)    
    return {
        type: actionTypes.AGENCIES_LOAD_SUCCESS,
        payload: agencies
    }
}


const agenciesLoadError = (errorMessage) => {
    return {
        type: actionTypes.AGENCIES_LOAD_ERROR,
        payload: errorMessage
    }
}
const agencyIdLoadStart = () => {
    return {
        type: actionTypes.AGENCY_ID_LOAD_START
    };
}
const agencyIdLoadSuccess = (singleCitizen) => {
    return {
        type: actionTypes.AGENCY_ID_LOAD_SUCCESS,
        payload: singleCitizen
    }
}

const agencyIdLoadError = (errorMessage) => {
    return {
        type: actionTypes.AGENCY_ID_LOAD_ERROR,
        payload: errorMessage
    }
}

const agencyAppend = (agency) => {
    return {
        type: actionTypes.AGENCY_APPEND,
        payload: agency
    }
}

const a =  {
    agencyAppend,
    agenciesLoadStart,
    agenciesLoadSuccess,
    agenciesLoadError,
    agencyIdLoadStart,
    agencyIdLoadSuccess,
    agencyIdLoadError
}

export default a