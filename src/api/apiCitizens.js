import apiClient from "../axios/api";
const token = localStorage.getItem("token");
export const getAllCitizens = () => {
    return apiClient().get("/citizens", );
}