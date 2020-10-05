import axios from 'axios';
import {queryString} from '../helpers';
import {tokenService} from './token.service';

export const authService = {
    login,
    logout
};

// Login 
function login(username, password){

    let queries = {
        username: username,
        password: password,
        apikey: process.env.REACT_APP_API_KEY
    };

    const query = queryString(queries);

    return new Promise((resolve, reject) => {
        return tokenService.getToken()
        .then(
            token => {
                axios({
                    method: 'get',
                    url: `${process.env.REACT_APP_API_URL}/users/1.0/auth?${query}`,
                    headers: {'Authorization': `bearer ${token.access_token}`}
                })
                .then(response => response.data)
                .then(user => {
                    localStorage.setItem('user', JSON.stringify({user, token}));
                    resolve(user);
                })
                .catch( error => {
                    reject({
                        status: error.response ? error.response.status : 500,
                        message: error.response ? error.response.data.message : error.message
                    })
                })
            },
            error => {
                reject(error);
            }
        )
    });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}