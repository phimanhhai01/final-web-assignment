import actions from './families.actions';

import { getAllFamilies } from '../../../api/apiFamilies';

export const loadFamiliesAsync = (token) => {
    return dispatch => {
        dispatch(actions.familiesLoadStart());
        getAllFamilies(token).then(response => dispatch(actions.familiesLoadSuccess(response.data)))
                    .catch(error => dispatch(actions.familiesLoadError(error.message)));
    }
}