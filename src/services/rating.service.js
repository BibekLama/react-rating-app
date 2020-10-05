import axios from 'axios';
import {tokenHeader, authHeader, queryString} from '../helpers';
import {userService} from './user.service';
import {movieService} from './movie.service';

export const ratingService = {
    getAllMovieRatings,
    getAllUserRatings,
    addRating
};

function getAllMovieRatings(movieId){
    var queries = {
        apikey: process.env.REACT_APP_API_KEY
    };

    const query = queryString(queries);

    return new Promise((resolve, reject) => {
        return axios({
            method:'get', 
            url:`${process.env.REACT_APP_API_URL}/ratings/1.0/movies/${movieId}/?${query}`, 
            headers: tokenHeader()
        })
        .then(response => response.data.data)
        .then(ratings => {
            ratings = ratings.map( rating => {  
                return userService.getById(rating.userId)
                .then( 
                    r =>  { 
                        return {...rating, username: r.username} 
                    },
                    err => { return {...rating, username: null}
                })
            });
       
            Promise.all(ratings).then( 
                value => {
                    // console.log(value);
                    resolve(value)
                },
                err => {
                    console.log(err.response)
                })
        })
        .catch(error => {
            reject({
                status: error.response ? error.response.status : 500,
                message: error.response ?  error.response.data.message : error.message
            })
        });
    });
}

function getAllUserRatings(userId){
    var queries = {
        apikey: process.env.REACT_APP_API_KEY
    };

    const query = queryString(queries);

    return new Promise((resolve, reject) => {
        return axios({
            method:'get', 
            url:`${process.env.REACT_APP_API_URL}/ratings/1.0/users/${userId}/?${query}`, 
            headers: tokenHeader()
        })
        .then(response => response.data.data)
        .then(ratings => {
            ratings = ratings.map( rating => {  
                return userService.getById(userId)
               .then( 
                   u =>  { 
                        return movieService.getById(rating.movieId)
                        .then( 
                            mov =>  { 
                                return {
                                    ...rating, 
                                    username: u.username,
                                    movie: mov
                                } 
                            },
                            err => {return {...rating, username: u.username, movie: null}}
                        )
                    },
                    err => { return {...rating, username: null, movie: null} }
                )
            });
       
            Promise.all(ratings).then( 
                value => {
                    // console.log(value);
                    resolve(value)
                },
                err => {
                    console.log(err.response)
                })
        })
        .catch(error => {
            reject({
                status: error.response ? error.response.status : 500,
                message: error.response ?  error.response.data.message : error.message
            })
        });
    });
}

function addRating(data){
    var queries = {
        apikey: process.env.REACT_APP_API_KEY
    };

    const query = queryString(queries);

    return new Promise((resolve, reject) => {
        return axios({
            method:'post', 
            url:`${process.env.REACT_APP_API_URL}/ratings/1.0/?${query}`, 
            headers: {...tokenHeader(), 'content-type': 'application/json'},
            data: data
        })
        .then(res => res.data.data)
        .then(rating => {
            axios({
                method:'get', 
                url:`${process.env.REACT_APP_API_URL}/users/1.0/${rating.userId}/?${query}`, 
                headers: tokenHeader()
            }).then(res => res.data)
           .then( r =>  resolve({...rating, username: r.username}))
           .catch(err =>  resolve({...rating, username: null}))
        })
        .catch(error => {
            console.log(data)
            console.log(error.response)
            debugger
            reject({
                status: error.response ? error.response.status : 500,
                message: error.response ?  error.response.data.message : error.message
            })
        });
    });

}