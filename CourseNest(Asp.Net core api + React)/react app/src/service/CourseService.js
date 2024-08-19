import axios from "axios";

export function fetchData(){
    return axios.get('https://localhost:7105/api/Course')
}


export const fetchCourseById = (id) => {
    //return axios.get(`https://localhost:7105/api/Course/${id}`);
    return axios.get(`https://localhost:7105/api/Course/update/${id}`)
  };