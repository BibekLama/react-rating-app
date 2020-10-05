import axios from 'axios';
import {tokenHeader, queryString} from '../helpers';

export const profileService = {
    addProfile
}

function addProfile(userId, data){
    var queries = {
        apikey: process.env.REACT_APP_API_KEY
    };
    const query = queryString(queries);

    return new Promise((resolve, reject) => {
        return axios({
            method:'post', 
            url:`${process.env.REACT_APP_API_URL}/profiles/1.0/${userId}/?${query}`, 
            headers: {...tokenHeader(), 'content-type': 'application/json'},
            data: JSON.stringify(data)
        })
        .then(response => response.data)
        .then(profile => {
            resolve(profile)
        })
        .catch(error => {
            console.log(error.response)
            debugger
            reject({
                status: error.response ? error.response.status : 500,
                message: error.response ? error.response.data.message : error.message
            })
        });
    });
}