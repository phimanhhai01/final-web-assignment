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
        case actionTypes.CITIZEN_ADD_FILTER_LIST: 
            return {
                ...state,
                filterList: [...payload]
            }
        default:
            return state;
    }
}

export default citizensReducer;