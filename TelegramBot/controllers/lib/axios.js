const axios = require('axios');
const BASE_URL = 'YOUR_BASE_URL_HERE'; // Specify your base URL here

function getAxiosInstance() {
    return {
        get: (method, params) => {
            return axios.get(`/${method}`, {
                baseURL: BASE_URL,
                params,
            });
        },
        post: (method, data) => {
            return axios({
                method: 'post',
                url: `/${method}`,
                baseURL: BASE_URL,
                data,
            });
        }
    };
}

// Example usage:
const axiosInstance = getAxiosInstance();
axiosInstance.get('yourMethod', { param1: 'value1' })
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
