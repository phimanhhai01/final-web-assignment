import actionTypes from './citizens.actionTypes';
import initialStates from './citizens.initialStates';

const citizenReducer = (state = initialStates, {type, payload}) => {
    switch(type){
        case actionTypes.CITIZENS_LOAD_START:
            return {
                ...state,
                isLoading: true
            }
        case actionTypes.CITIZENS_LOAD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                citizens: payload,
            }
        case actionTypes.CITIZENS_LOAD_ERROR:
            return {
                ...state,
                isLoading: false,
                errorMessage: payload
            }
        default:
            return state;
    }
}

export default citizenReducer;