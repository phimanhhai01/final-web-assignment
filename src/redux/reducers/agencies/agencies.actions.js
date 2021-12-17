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
const agencyUpdate = (agency) => {
    return {
        type: actionTypes.AGENCY_UPDATE,
        payload: agency
    }
}

const agencyDelete = (id) => {
    return {
        type: actionTypes.AGENCY_DELETE,
        payload: id
    }
}

const subAgenciesLoadStart = () => {
    return {
        type: actionTypes.SUBAGENCIES_LOAD_START
    };
}
const subAgenciesLoadError = (errorMessage) => {
    return {
        type: actionTypes.SUBAGENCIES_LOAD_START,
        payload: errorMessage
    };
}
const subAgenciesLoadSuccess = (subAgencies) => {
    return {
        type: actionTypes.SUBAGENCIES_LOAD_SUCCESS,
        payload: subAgencies
    }
}

const agencyReset = () => {
    return {
        type: actionTypes.AGENCY_RESET
    }
}
const a =  {
    agencyReset,
    agencyDelete,
    agencyUpdate,
    agencyAppend,
    agenciesLoadStart,
    agenciesLoadSuccess,
    agenciesLoadError,
    agencyIdLoadStart,
    agencyIdLoadSuccess,
    agencyIdLoadError,
    subAgenciesLoadStart,
    subAgenciesLoadError,
    subAgenciesLoadSuccess
}

export default a