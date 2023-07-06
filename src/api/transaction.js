import axios from "axios";
import { API_HOST } from "../utils/constant";

export const authRequets = data => {
    const url = `${API_HOST}/checkout_session`;

    const headers = {
        "Content-Type": "application/json",
        'Authorization': `Basic ${btoa('1:sk_password')}`,
    };

    return axios.post(url, data, { headers })
        .then(response => response)
        .catch(handleError);
};

const handleError = error => {
    if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        return { error: error.response.data ? error.response.data : (error.response.data.errors ? error.response.data.errors : (`status: ${error.response.status}  message: ${error.response.data.message}`)), content: error.response.data?.content };
    } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.message);
        return { error: error.message }
    } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
        return { error: `Error ${error.message}` }
    }
};
