import apiClient from "../axios/api";

export const getAllCitizens = () => {
    return apiClient().get("citizens");
}