import apiAuthedClient from "../axios/apiAuthed";

export const getAllCitizens = () => {
    return apiAuthedClient().get("/api/citizen/");
}

export const getCitizenById = (id) => {
    return apiAuthedClient().get(`/api/citizen/${id}/`);
}

export const addCitizen = ({id_number,name,dob,gender,ethnic,religion,educational,occupations,village_id,home_town,address_line1,address_line2}) => {
    return apiAuthedClient().post("/api/citizen/",{id_number,name,dob,gender,ethnic,religion,educational,occupations,village_id,home_town,address_line1,address_line2});
}

export const updateCitizen = ({id,id_number,name,dob,gender,ethnic,religion,educational,occupations,village_id,home_town,address_line1,address_line2}) => {
    console.log("update");
    console.log(id);
    return apiAuthedClient().put(`/api/citizen/${id}/`,{id_number,name,dob,gender,ethnic,religion,educational,occupations,village_id,home_town,address_line1,address_line2});
}

export const deleteCitizen = (id) => {
    console.log("delete");
    console.log(id);
    return apiAuthedClient().delete(`/api/citizen/${id}/`);
}
