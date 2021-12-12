import actions from './citizens.actions';

import { getAllCitizens, getCitizenById } from '../../../api/apiCitizens';

export const loadCitizensAsync = () => {
    return dispatch => {
        dispatch(actions.citizensLoadStart());
        getAllCitizens()
        .then(response => {
            dispatch(actions.citizensLoadSuccess(response.data));
        })
        .catch(error => dispatch(actions.citizensLoadError(error.message)));
    }
}

export const loadCitizenByIdAsync = (id) => {
    return dispatch => {
        dispatch(actions.citizenIdLoadStart());
        getCitizenById(id).then(response => dispatch(actions.citizenIdLoadSuccess(response.data)))
                        .catch(error => dispatch(actions.citizenIdLoadError(error.message)));
    }
}