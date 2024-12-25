import axios from "axios"

export const axiosInstance = axios.create({
     baseURL: "https://kblog14.netlify.app/api",
     withCredentials: true,
});