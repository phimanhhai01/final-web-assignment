import actions from './citizens.actions';

import { getAllCitizens } from '../../../api/apiCitizens';

export const loadCitizensAsync = (token) => {
    return dispatch => {
        dispatch(actions.citizensLoadStart());
        getAllCitizens(token).then(response => dispatch(actions.citizensLoadSuccess(response.data)))
                    .catch(error => dispatch(actions.citizensLoadError(error.message)));
    }
}