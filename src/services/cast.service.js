import axios from 'axios';
import {authHeader, queryString} from '../helpers';

export const castService = {
    getAll,
    getById,
    addCast,
    deleteCast,
    updateCast
}

// Get all casts
function getAll(){
    var queries = {
        apikey: process.env.REACT_APP_API_KEY
    };

    const query = queryString(queries);

    return new Promise((resolve, reject) => {
        return axios({
            method:'get', 
            url:`${process.env.REACT_APP_API_URL}/persons/1.0/?${query}`, 
            headers: authHeader()
        })
        .then(response => response.data)
        .then(persons => {
            resolve(persons)
        })
        .catch(error => {
            reject({
                status: error.response ? error.response.status : 500,
                message: error.response ?  error.response.data.message : error.message
            })
        });
    });
}

// Get cast by id
function getById(id){
    var queries = {
        apikey: process.env.REACT_APP_API_KEY
    };

    const query = queryString(queries);

    return new Promise((resolve, reject) => {
        return axios({
            method:'get', 
            url:`${process.env.REACT_APP_API_URL}/persons/1.0/${id}/?${query}`, 
            headers: authHeader()
        })
        .then(response => response.data)
        .then(person => {
            resolve(person)
        })
        .catch(error => {
            reject({
                status: error.response ? error.response.status : 500,
                message: error.response ? error.response.data.message : error.message
            })
        });
    });
}

// Add new Cast
function addCast(data){
    var queries = {
        apikey: process.env.REACT_APP_API_KEY
    };

    const query = queryString(queries);

    return new Promise((resolve, reject) => {
        return axios({
            method:'post', 
            url:`${process.env.REACT_APP_API_URL}/persons/1.0/?${query}`, 
            headers: authHeader(),
            data: data
        })
        .then(response => response.data)
        .then(person => {
            resolve(person)
        })
        .catch(error => {
            reject({
                status: error.response ? error.response.status : 500,
                message: error.response ? error.response.data.message : error.message
            })
        });
    });
}

// Delete cast
function deleteCast(id){
    var queries = {
        apikey: process.env.REACT_APP_API_KEY
    };

    const query = queryString(queries);

    return new Promise((resolve, reject) => {
        return axios({
            method:'delete', 
            url:`${process.env.REACT_APP_API_URL}/persons/1.0/${id}/?${query}`, 
            headers: authHeader()
        })
        .then(response => response.data)
        .then(person => {
            resolve(person)
        })
        .catch(error => {
            reject({
                status: error.response ? error.response.status : 500,
                message: error.response ? error.response.data.message : error.message
            })
        });
    });
}

// Update Cast
function updateCast(id, data){
    var queries = {
        apikey: process.env.REACT_APP_API_KEY
    };

    const query = queryString(queries);

    return new Promise((resolve, reject) => {
        return axios({
            method:'patch', 
            url:`${process.env.REACT_APP_API_URL}/persons/1.0/${id}/?${query}`, 
            headers: authHeader(),
            data: data
        })
        .then(response => response.data)
        .then(person => {
            resolve(person)
        })
        .catch(error => {
            reject({
                status: error.response ? error.response.status : 500,
                message: error.response ? error.response.data.message : error.message
            })
        });
    });
}