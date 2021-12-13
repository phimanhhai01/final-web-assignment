import apiAuthedClient from "../axios/apiAuthed";
import axiosClient from "../axios/myapi";
export const getAllAgencies = () => {
    return apiAuthedClient().get("/api/agency/");
}

export const getAgencyById = (id) => {
    return apiAuthedClient().get(`/api/agency/${id}/`);
}

export const createAgency = (data) => {
    return axiosClient.post(`agency/`, data);
}

export const getAgency= (id) => {
    return axiosClient.get(`agency/${id}/`, );
}

export const agencyRename = (id, data) => {
    return axiosClient.put(`agency/${id}/`, data);
}
export const changePassword = (id, data) => {
    return axiosClient.post(`user/${id}/change_password/`, data);
}