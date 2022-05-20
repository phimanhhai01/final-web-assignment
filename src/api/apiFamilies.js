import apiAuthedClient from "../axios/apiAuthed";

export const getAllFamilies = (token) => {
    return apiAuthedClient(token).get("/api/family/");
}