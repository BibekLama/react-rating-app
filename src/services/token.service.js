import axios from 'axios';
import {queryString} from '../helpers';

export const tokenService = {
    getToken
};

// Fetch token
function getToken(){

    let queries = {
        client_id: "movie-application",
        password: "epita",
        grant_type: "password",
        username: "epita",
    };

    const query = queryString(queries);

    return new Promise((resolve, reject) => {
        return axios({
            method: 'post', 
            url: `${process.env.REACT_APP_TOKEN_API_URL}/token`, 
            data: query, 
            headers: {
                "content-type": "application/x-www-form-urlencoded",
            }
        })
        .then(response => response.data)
        .then(token => {
           resolve(token);
        })
        .catch(error => {
            reject({
                status: error.response ? error.response.status : 500,
                message: error.response ? error.response.data.message : error.message
            })
        });
    });
}