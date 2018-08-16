import axios from "axios";

axios.defaults.withCredentials = true;

const api = axios.create({
    baseURL: API_ENDPOINT
});

export default api;
