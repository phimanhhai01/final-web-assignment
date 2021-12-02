import apiAuthedClient from "../axios/apiAuthed";

export const getAllCitizens = (token) => {
    return apiAuthedClient(token).get("/api/citizen/");
}