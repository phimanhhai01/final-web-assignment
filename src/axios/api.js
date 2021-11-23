const { SERVER_API_URL } = process.env;
import axios from "axios";
const apiClient = () => {
    const axiosInstance = axios.create({
        baseURL: SERVER_API_URL,
        responseType: 'json'
    });
    return axiosInstance;
}

export default apiClient;