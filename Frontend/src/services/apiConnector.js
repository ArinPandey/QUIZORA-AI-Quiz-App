import axios from "axios";

// Axios ka ek instance create kar rahe hain
export const axiosInstance = axios.create({});

// Ye hamara main API connector function hai
export const apiConnector = (method, url, bodyData, headers, params) => {
    // Ye function axiosInstance ko call karega with the right parameters
    return axiosInstance({
        method: `${method}`,
        url: `${url}`,
        data: bodyData ? bodyData : null,
        headers: headers ? headers : null,
        params: params ? params : null,
    });
};


axiosInstance.interceptors.request.use(
    (config) => {
        // localStorage se token nikaalo
        const token = localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null;

        // Agar token hai, toh request ke header mein 'Authorization' add kar do
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);