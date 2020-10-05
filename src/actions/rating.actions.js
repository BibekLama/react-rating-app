import { ratingTypes } from '../constants';
import { ratingService, tokenService } from '../services';
import {alertActions} from './alert.actions';

export const ratingActions = {
    fetchMovieRatings,
    fetchUserRatings,
    addRating
}

function fetchMovieRatings(movieId){
    return dispatch => {
        dispatch(request());

        ratingService.getAllMovieRatings(movieId).then(
            ratings => {
                dispatch(success(ratings))
            },
            error => {
                if(error.status === 401){
                    tokenService.getToken().then(
                        token => localStorage.setItem('token', JSON.stringify(token)),
                        error => failure(error.message)
                    )
                }else{
                    dispatch(alertActions.error(''))
                    dispatch(failure(error.message));
                }
            }
        );
    }

    function request() { return { type: ratingTypes.FETCH_MOVIE_RATINGS_REQUEST } }
    function success(ratings) { return { type: ratingTypes.FETCH_MOVIE_RATINGS_SUCCESS, payload: ratings } }
    function failure(error) { return { type: ratingTypes.FETCH_MOVIE_RATINGS_FAILURE, payload: error } }
}

function fetchUserRatings(userId){
    return dispatch => {
        dispatch(request());

        ratingService.getAllUserRatings(userId).then(
            ratings => {
                dispatch(success(ratings))
            },
            error => {
                if(error.status === 401){
                    tokenService.getToken().then(
                        token => localStorage.setItem('token', JSON.stringify(token)),
                        error => failure(error.message)
                    )
                }else{
                    dispatch(alertActions.error(""))
                    dispatch(failure(error.message));
                }
            }
        );
    }

    function request() { return { type: ratingTypes.FETCH_MOVIE_RATINGS_REQUEST } }
    function success(ratings) { return { type: ratingTypes.FETCH_MOVIE_RATINGS_SUCCESS, payload: ratings } }
    function failure(error) { return { type: ratingTypes.FETCH_MOVIE_RATINGS_FAILURE, payload: error } }
}

function addRating(data){
    return dispatch => {
        dispatch(request());

        ratingService.addRating(data).then(
            rating => {
                dispatch(alertActions.success("Successfully added rating to this movie"));
                dispatch(success(rating))
            },
            error => {
                if(error.status === 401){
                    tokenService.getToken().then(
                        token => localStorage.setItem('token', JSON.stringify(token)),
                        error => failure(error.message)
                    )
                }else{
                    dispatch(alertActions.error(error.message))
                    dispatch(failure(error.message));
                }
            }
        );
    }

    function request() { return { type: ratingTypes.ADD_RATING_REQUEST } }
    function success(rating) { return { type: ratingTypes.ADD_RATING_SUCCESS, payload: rating } }
    function failure(error) { return { type: ratingTypes.ADD_RATING_FAILURE, payload: error } }
}