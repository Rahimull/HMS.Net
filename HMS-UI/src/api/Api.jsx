import axios from "axios";

const Api = axios.create({
    baseURL: "http://localhost:5007/api",
    headers: {
        "Content-Type": "application/json",
    },
});

export default Api;