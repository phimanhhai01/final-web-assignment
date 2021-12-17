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

export const toggleDeclarePermision = (id) => {
    return axiosClient.get(`user/${id}/toggle_declare_permission`);
}//http://127.0.0.1:8000/api/user/6/toggle_declare_permission

export const scheduleDeclarePermission = (data) => {
    return axiosClient.post(`user/schedule/`, data);
}

export const deleteAgencyApi = (id) => {
    return axiosClient.delete(`agency/${id}`);
}
export const getSubAgencies = () => {
    return axiosClient.get(`agency/subtree/`)
}
export const toggleCompletedDeclareApi = () => {
    return axiosClient.get(`agency/completed_declared_toggle`);
}