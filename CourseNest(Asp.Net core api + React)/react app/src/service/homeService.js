import axios from "axios";

export function fetchHomeError(){
    return axios.get('https://localhost:7105/api/Home/error')
}

export function HomePrivacy(){
    return axios.get('https://localhost:7105/api/Home/privacy')
}

export const fetchCourseById = (id) => {
    //return axios.get(`https://localhost:7105/api/Course/${id}`);
    return axios.get(`https://localhost:7105/api/Course/update/${id}`)
  };