import axios from 'axios';

const URL = "https://localhost:44320/api/v1";

const entity = axios.create({
    baseURL: URL,
});

// show dialog ở đây luôn
entity.interceptors.response.use(
    res => res,
    error => { throw error.response.data.Data; }
);

export default entity;