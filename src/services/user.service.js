import axios from 'axios';
import {tokenHeader, authHeader, queryString} from '../helpers';
import {profileService} from './profile.service';

export const userService = {
    getById,
    addUser
};

// Get user details by id
function getById(id, role){

    var queries = {
        apikey: process.env.REACT_APP_API_KEY
    };

    const query = queryString(queries);

    return new Promise((resolve, reject) => {
        return axios({
            method:'get', 
            url:`${process.env.REACT_APP_API_URL}/users/1.0/${id}/?${query}`, 
            headers: role === 'user' ? authHeader() : tokenHeader()
        })
        .then(response => response.data)
        .then(user => {
            resolve(user)
        })
        .catch(error => {
            reject({
                status: error.response ? error.response.status : 500,
                message: error.response ? error.response.data.message : error.message
            })
        });
    });
}

// add user
function addUser(data){

    var queries = {
        apikey: process.env.REACT_APP_API_KEY
    };

    const query = queryString(queries);

    return new Promise((resolve, reject) => {
        return axios({
            method:'post', 
            url:`${process.env.REACT_APP_API_URL}/users/1.0/?${query}`, 
            headers: {...tokenHeader(), 'content-type': 'application/json'},
            data: JSON.stringify({
                username: data.username,
                password: data.password,
                profile: data.profile
            })
        })
        .then(response => response.data)
        .then(user => {
            profileService.addProfile(user.user_id, data.profile)
            .then(
                profile => resolve({...user, profile }),
                err => resolve({...user, profile:null})
            )
        })
        .catch(error => {
            reject({
                status: error.response ? error.response.status : 500,
                message: error.response ? error.response.data.message : error.message
            })
        });
    });
}
