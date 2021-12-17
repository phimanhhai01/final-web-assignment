import actionTypes from './agencies.actionTypes';
import initialStates from './agencies.initialStates';

const agencyReducer = (state = initialStates, {type, payload}) => {
    switch(type){
        case actionTypes.AGENCIES_LOAD_START:
            return {
                ...state,
                isLoadingAgencies: true
            }
        case actionTypes.AGENCIES_LOAD_SUCCESS:
            return {
                ...state,
                isLoadingAgencies: false,
                agencies: payload,
            }
        case actionTypes.AGENCIES_LOAD_ERROR:
            return {
                ...state,
                isLoadingAgencies: false,
                errorMessage: payload
            }
        case actionTypes.AGENCY_ID_LOAD_START:
            return {
                ...state,
                isLoadingAgencyById: true,
            }
        case actionTypes.AGENCY_ID_LOAD_SUCCESS:
            return {
                ...state,
                isLoadingAgencyById: false,
                agencyById: payload
            }
        case actionTypes.AGENCY_ID_LOAD_ERROR: 
            return {
                ...state,
                isLoadingAgencyById: false,
                errorMessage: payload
            }
        case actionTypes.AGENCY_APPEND: 
            return {
                ...state,
                agencies: [...state.agencies, payload]
            }
        case actionTypes.AGENCY_UPDATE: 
            let agencies = state.agencies
            let index = agencies.findIndex(item => item.id === payload.id)
            if (index !== -1) {
                agencies[index] = payload
            }
            return {
                ...state,
                agencies: agencies
            }
        case actionTypes.AGENCY_DELETE: 
            let new_agencies = state.agencies.filter(item => item.id !== payload)
            return {
                ...state,
                agencies: new_agencies
            }
        case actionTypes.SUBAGENCIES_LOAD_START:
            return {
                ...state,
                isLoadingSubAgencies: true,
            }
        case actionTypes.SUBAGENCIES_LOAD_SUCCESS:
            return {
                ...state,
                subAgencies: payload,
                isLoadingSubAgencies: false,
            }
        case actionTypes.SUBAGENCIES_LOAD_ERROR: 
            return {
                ...state,
                isLoadingSubAgencies: false,
                errorMessage: payload
            }
        default:
            return state;
    }
}

export default agencyReducer;