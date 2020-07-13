import axios from 'axios';

axios.defaults.baseURL = "http://localhost:8000";

axios.interceptors.request.use(

   async (config) => {
       console.log('in head')
        const occupantToken = await localStorage.getItem("ACCESS_TOKEN_OCCUPANT")
        const lessorToken = await localStorage.getItem("ACCESS_TOKEN_LESSON")
        if (!occupantToken && !lessorToken) {
            console.log('in not')
            return config;
        }
        if (occupantToken) {
            console.log('in occupant')
            config.headers['Authorization'] = `Bearer ${occupantToken}`;
            console.log(config)
            return config;
        }
        if (lessorToken) {
            console.log('in lesson')
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






















// if(localStorage.getItem("ACCESS_TOKEN_OCCUPANT") || localStorage.getItem("ACCESS_TOKEN_LESSON"))
// {

//     axios.interceptors.request.use(
//         config=> {
//             const occupantToken = localStorage.getItem("ACCESS_TOKEN_OCCUPANT")
//             const lessorToken = localStorage.getItem("ACCESS_TOKEN_LESSON")
//         if(occupantToken){
//             config.headers['Authorization'] = `Bearer ${occupantToken}`;
//             return config;
//         }
//         if(lessorToken){
//             config.headers['Authorization'] = `Bearer ${lessorToken}`;
//             return config;
//         }
//     },
//     error => {
//         throw error;
//     }
//     )


//     axios.interceptors.response.use((response)=>{
//         return response;
//     },
//     (error)=> {

//         if(error){
//             if(error.response.status === 401){
//                 localStorage.removeItem("ACCESS_TOKEN_OCCUPANT")
//                 localStorage.removeItem("ACCESS_TOKEN_LESSON")
//             }
//             return Promise.reject(error);
//         }

//     }
//     )

// }




// axios.interceptors.response.use(
//     config => {
//         return config
//     },
//     error => {
//         console.log('axios config response', error);
//         console.log(error)
//         if(error.response.status === 401) {
//             localStorage.removeItem('ACCESS_TOKEN_OCCUPANT');
//             localStorage.removeItem('ACCESS_TOKEN_LESSON');
//             window.location.reload();
//         }
//         return Promise.reject(error);
//     }
// );



export default axios;