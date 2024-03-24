//Basic imports
import axios from "axios";

//Axios instance to connect with pokiapi.co
const axiosInstance = axios.create({
    baseURL: "https://pokeapi.co/api/v2/",
    timeout: 5000
});

export default axiosInstance;