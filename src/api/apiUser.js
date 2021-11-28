import apiClient from "../axios/api";

export const apiLoginUser = ({username, password}) => {
    return apiClient().post("/api/user/login/", {username, password})
}
export const isAuthenticated = () => {
    if (typeof window === "undefined"){
        return false;
    }
    if(localStorage.getItem("token")){
        return localStorage.getItem("token");
    }
    else{
        return false;
    }
}