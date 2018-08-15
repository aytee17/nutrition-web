import axios from "axios";

axios.defaults.withCredentials = true;

const http = axios.create({
    baseURL: "http://localhost:3000/"
});

export default http;
