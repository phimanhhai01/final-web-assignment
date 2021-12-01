import axios from "axios";
const token = localStorage.getItem("token");
const apiAuthedClient = (token) => {
    const axiosInstance = axios.create({
        baseURL: process.env.REACT_APP_SERVER_API_URL,
        responseType: 'json',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return axiosInstance;
}

export default apiAuthedClient;