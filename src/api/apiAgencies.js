import apiAuthedClient from "../axios/apiAuthed";

export const getAllAgencies = () => {
    return apiAuthedClient().get("/api/agency/");
}

export const getAgencyById = (id) => {
    return apiAuthedClient().get(`/api/agency/${id}/`);
}

export const createAgency = (data) => {
    return apiAuthedClient().post(`/api/agency/`, data={data});
}