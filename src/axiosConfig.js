import axios from 'axios';

// Axios instance
const axiosInstance = axios.create({
    baseURL: 'http://localhost:8081', // Ini harus sesuai dengan path API Anda
    headers: {
        'Content-Type': 'application/json',
    },
});


export default axiosInstance;
