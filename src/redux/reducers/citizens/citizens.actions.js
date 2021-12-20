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

const citizenAppend = (citizen) => {
    return {
        type: actionTypes.CITIZEN_APPEND,
        payload: citizen
    }
}
const citizenUpdate = (citizen) => {
    return {
        type: actionTypes.CITIZEN_UPDATE,
        payload: citizen
    }
}

const citizenDelete = (id) => {
    return {
        type: actionTypes.CITIZEN_DELETE,
        payload: id
    }
}
const citizenAddFilterList = (filterList) => {
    return {
        type: actionTypes.CITIZEN_ADD_FILTER_LIST,
        payload: filterList
    }
}

const actions =  {
    citizenDelete,
    citizenUpdate,
    citizenAppend,
    citizensLoadStart,
    citizensLoadSuccess,
    citizensLoadError,
    citizenIdLoadStart,
    citizenIdLoadSuccess,
    citizenIdLoadError,
    citizenAddFilterList
}

export default actions;