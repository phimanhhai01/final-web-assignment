import actionTypes from './citizens.actionTypes';
import initialStates from './citizens.initialStates';

const citizensReducer = (state = initialStates, {type, payload}) => {
    switch(type){
        case actionTypes.CITIZENS_LOAD_START:
            return {
                ...state,
                isLoadingCitizens: true
            }
        case actionTypes.CITIZENS_LOAD_SUCCESS:
            return {
                ...state,
                isLoadingCitizens: false,
                citizens: payload,
            }
        case actionTypes.CITIZENS_LOAD_ERROR:
            return {
                ...state,
                isLoadingCitizens: false,
                errorMessage: payload
            }
        case actionTypes.CITIZEN_ID_LOAD_START:
            return {
                ...state,
                isLoadingCitizenById: true,
            }
        case actionTypes.CITIZEN_ID_LOAD_SUCCESS:
            return {
                ...state,
                isLoadingCitizenById: false,
                citizenById: payload
            }
        case actionTypes.CITIZEN_ID_LOAD_ERROR: 
            return {
                ...state,
                isLoadingCitizenById: false,
                errorMessage: payload
            }
        case actionTypes.CITIZEN_APPEND: 
            return {
                ...state,
                citizens: [...state.citizens, payload]
            }
        case actionTypes.CITIZEN_UPDATE: 
            let citizens = state.citizens
            let index = citizens.findIndex(item => item.id === payload.id)
            if (index !== -1) {
                citizens[index] = payload
            }
            return {
                ...state,
                citizens: citizens
            }
        case actionTypes.CITIZEN_DELETE: 
            let new_citizens = state.citizens.filter(item => item.id !== payload)
            return {
                ...state,
                citizens: new_citizens
            }
        case actionTypes.AGENCY_RESET: 
            return initialStates
        case actionTypes.CITIZEN_ADD_FILTER_LIST: 
            if(payload.type === "analysis"){
                return {
                    ...state,
                    filterListAnalysis: [...payload.selectedOptions]
                }
            }
            return {
                ...state,
                filterList: [...payload.selectedOptions]
            }
        default:
            return state;
    }
}

export default citizensReducer;