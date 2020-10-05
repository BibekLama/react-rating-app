import axios from 'axios';
import {tokenHeader, authHeader, queryString} from '../helpers';

export const genreService = {
    getAll,
    getById,
    addGenre,
    deleteGenre,
    updateGenre,
    genreMovieCount
}

// Get all genres
function getAll(role){
    var queries = {
        apikey: process.env.REACT_APP_API_KEY
    };

    const query = queryString(queries);

    return new Promise((resolve, reject) => {
        return axios({
            method:'get', 
            url:`${process.env.REACT_APP_API_URL}/genres/1.0/?${query}`, 
            headers: role === 'user' ? authHeader() : tokenHeader()
        })
        .then(response => response.data)
        .then(genres => {
            resolve(genres.data)
        })
        .catch(error => {
            reject({
                status: error.response ? error.response.status : 500,
                message: error.response ? error.response.data.error ? error.response.data.error.message : error.response.data.message : error.message
            })
        });
    });
}

// Get genre by id
function getById(id){
    var queries = {
        apikey: process.env.REACT_APP_API_KEY
    };

    const query = queryString(queries);

    return new Promise((resolve, reject) => {
        return axios({
            method:'get', 
            url:`${process.env.REACT_APP_API_URL}/genres/1.0/${id}/?${query}`, 
            headers: authHeader()
        })
        .then(response => response.data)
        .then(genre => {
            resolve(genre.data)
        })
        .catch(error => {
            reject({
                status: error.response ? error.response.status : 500,
                message: error.response ? error.response.data.error ? error.response.data.error.message : error.response.data.message : error.message
            })
        });
    });
}

// Add new Genre
function addGenre(data){
    var queries = {
        apikey: process.env.REACT_APP_API_KEY
    };

    const query = queryString(queries);

    return new Promise((resolve, reject) => {
        return axios({
            method:'post', 
            url:`${process.env.REACT_APP_API_URL}/genres/1.0/?${query}`, 
            headers: authHeader(),
            data: data
        })
        .then(response => response.data)
        .then(genre => {
            resolve(genre.data)
        })
        .catch(error => {
            reject({
                status: error.response ? error.response.status : 500,
                message: error.response ? error.response.data.error ? error.response.data.error.message : error.response.data.message : error.message
            })
        });
    });
}

// Delete Genre
function deleteGenre(id){
    var queries = {
        apikey: process.env.REACT_APP_API_KEY
    };

    const query = queryString(queries);

    return new Promise((resolve, reject) => {
        return axios({
            method:'delete', 
            url:`${process.env.REACT_APP_API_URL}/genres/1.0/${id}/?${query}`, 
            headers: authHeader()
        })
        .then(response => response.data)
        .then(genre => {
            resolve(genre.data)
        })
        .catch(error => {
            reject({
                status: error.response ? error.response.status : 500,
                message: error.response ? error.response.data.error ? error.response.data.error.message : error.response.data.message : error.message
            })
        });
    });
}

// Update Genre
function updateGenre(id, data){
    var queries = {
        apikey: process.env.REACT_APP_API_KEY
    };

    const query = queryString(queries);

    return new Promise((resolve, reject) => {
        return axios({
            method:'patch', 
            url:`${process.env.REACT_APP_API_URL}/genres/1.0/${id}/?${query}`, 
            headers: authHeader(),
            data: data
        })
        .then(response => response.data)
        .then(genre => {
            resolve(genre.data)
        })
        .catch(error => {
            reject({
                status: error.response ? error.response.status : 500,
                message: error.response ? error.response.data.error ? error.response.data.error.message : error.response.data.message : error.message
            })
        });
    });
}

// Genre Movies Count
function genreMovieCount(){
    var queries = {
        apikey: process.env.REACT_APP_API_KEY
    };

    const query = queryString(queries);

    return new Promise((resolve, reject) => {
        return axios({
            method:'get', 
            url:`${process.env.REACT_APP_API_URL}/genres/1.0/chart/genres/?${query}`, 
            headers: authHeader()
        })
        .then(response => response.data.data)
        .then(data => {
            resolve(data)
        })
        .catch(error => {
            reject({
                status: error.response ? error.response.status : 500,
                message: error.response ? error.response.data.error ? error.response.data.error.message : error.response.data.message : error.message
            })
        });
    });
}