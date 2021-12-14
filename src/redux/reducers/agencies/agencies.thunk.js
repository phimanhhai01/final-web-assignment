import actions from './agencies.actions';

import { getAllAgencies, getAgencyById } from '../../../api/apiAgencies';

export const loadAgenciesAsync = () => {
    return dispatch => {
        dispatch(actions.agenciesLoadStart());
        getAllAgencies().then(response => dispatch(actions.agenciesLoadSuccess(response.data)))
                    .catch(error => dispatch(actions.agenciesLoadError(error.message)));
    }
}

export const loadAgencyByIdAsync = (id) => {
    return dispatch => {
        dispatch(actions.agencyIdLoadStart());
        getAgencyById(id).then(response => dispatch(actions.agencyIdLoadSuccess(response.data)))
                        .catch(error => dispatch(actions.agencyIdLoadError(error.message)))
    }
}

export const appendAgency = (agency) => {
    return dispatch => {
        dispatch(actions.agencyAppend(agency));
    }
}

export const updateAgency = (agency) => {
    return dispatch => {
        dispatch(actions.agencyUpdate(agency));
    }
}