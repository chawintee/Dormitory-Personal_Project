import axios from 'axios';

axios.defaults.baseURL = "http://localhost:8000";

axios.interceptors.request.use(

   async (config) => {
        const occupantToken = await localStorage.getItem("ACCESS_TOKEN_OCCUPANT")
        const lessorToken = await localStorage.getItem("ACCESS_TOKEN_LESSON")
        if (!occupantToken && !lessorToken) {
            return config;
        }
        if (occupantToken) {
            config.headers['Authorization'] = `Bearer ${occupantToken}`;
            return config;
        }
        if (lessorToken) {
            config.headers['Authorization'] = `Bearer ${lessorToken}`;
            return config;
        }
    },
    error => {
        throw error;
    }
)


axios.interceptors.response.use((response) => {
    return response;
},
    (error) => {
        if (error) {
            if (error.response.status === 401) {
                localStorage.removeItem("ACCESS_TOKEN_OCCUPANT")
                localStorage.removeItem("ACCESS_TOKEN_LESSON")
            }
            return Promise.reject(error);
        }
    }
)

export default axios;