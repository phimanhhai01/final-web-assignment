import axios from "axios";
const apiClient = () => {
    const axiosInstance = axios.create({
        baseURL: process.env.REACT_APP_SERVER_API_URL,
        responseType: 'json'
    });
    return axiosInstance;
}

export default apiClient;