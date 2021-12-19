import actions from './agencies.actions';

import { getAllAgencies, getAgencyById, getSubAgencies } from '../../../api/apiAgencies';

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

export const deleteAgency = (id) => {
    return dispatch => {
        dispatch(actions.agencyDelete(id));
    }
}
export const resetAgency = () => {
    return dispatch => {
        dispatch(actions.agencyReset());
    }
}

export const loadSubAgenciesAsync = () => {
    return dispatch => {
        dispatch(actions.subAgenciesLoadStart());
        getSubAgencies().then(response => dispatch(actions.subAgenciesLoadSuccess(response.data)))
                        .catch(error => dispatch(actions.subAgenciesLoadError(error.message)));
    }
}