import axios from 'axios';

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        "Accept": "application/json",
        "X-Requested-With": "XMLHttpRequest",
    },
    withCredentials: true,
})

// apiClient.interceptors.response.use(res => res, err => {
//     if(err.response.status ===401) {
//         localStorage.clear();
//     }
// })

export default apiClient;
