import actionTypes from './families.actionTypes';
import initialStates from './families.initialStates';

const familyReducer = (state = initialStates, {type, payload}) => {
    switch(type){
        case actionTypes.FAMILIES_LOAD_START:
            return {
                ...state,
                isLoading: true
            }
        case actionTypes.FAMILIES_LOAD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                families: payload,
            }
        case actionTypes.FAMILIES_LOAD_ERROR:
            return {
                ...state,
                isLoading: false,
                errorMessage: payload
            }
        default:
            return state;
    }
}

export default familyReducer;