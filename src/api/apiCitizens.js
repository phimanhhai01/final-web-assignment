import apiAuthedClient from "../axios/apiAuthed";

export const getAllCitizens = () => {
    return apiAuthedClient().get("/api/citizen/");
}

export const getCitizenById = (id) => {
    return apiAuthedClient().get(`/api/citizen/${id}/`);
}

export const addCitizen = (citizen) => {
    return apiAuthedClient().post("/api/citizen/",citizen);
}

export const addMultiCitizens = (citizens) => {
    return apiAuthedClient().post("/api/citizen/batch_create/",citizens);
}

export const updateCitizen = (citizen) => {
    return apiAuthedClient().put(`/api/citizen/${citizen.id}/`,citizen);
}

export const deleteCitizen = (id) => {
    return apiAuthedClient().delete(`/api/citizen/${id}/`);
}
