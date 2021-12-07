import apiAuthedClient from "../axios/apiAuthed";

export const getAllCitizens = () => {
    return apiAuthedClient().get("/api/citizen/");
}

export const getCitizenById = (id) => {
    return apiAuthedClient().get(`/api/citizen/${id}/`);
}