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

