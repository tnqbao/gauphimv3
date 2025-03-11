import axios, { AxiosInstance } from 'axios';

const createUserApiInstance = (): AxiosInstance => {
    const instance = axios.create({
        baseURL: process.env.NEXT_PUBLIC_USER_API,
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
        },
        timeout: parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || '10000', 10),
    });

    instance.interceptors.request.use((config) => {
        return config;
    });

    return instance;
};

const createMovieApiInstance = (): AxiosInstance => {
    return axios.create({
        baseURL: process.env.NEXT_PUBLIC_MOVIE_API,
        headers: {
            'Content-Type': 'application/json',
        },
        timeout: parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || '15000', 10),
    });
};



export const userApiInstance = createUserApiInstance();
export const movieApiInstance = createMovieApiInstance();

movieApiInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error("API Error:", error.response?.data || error.message)
        return Promise.reject(error)
    },
)

movieApiInstance.interceptors.request.use(
    (config) => {
        return config
    },
    (error) => {
        return Promise.reject(error)
    },
)