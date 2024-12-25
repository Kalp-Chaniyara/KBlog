import axios from "axios"

export const axiosInstance = axios.create({
     baseURL: "https://kblog-fcn7.onrender.com/api",
     withCredentials: true,
});