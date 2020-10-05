import { movieTypes } from '../constants';
import { movieService, tokenService } from '../services';
import { alertActions } from './alert.actions';
import { authActions } from './auth.actions';

export const movieActions = {
    fetchMovies,
    fetchMovie,
    addMovie,
    deleteMovie,
    updateMovie,
    fetchNewReleased,
    fetchPopular,
    searchMovies,
    fetchGenreMovies
};

function fetchMovies() {

    return dispatch => {
        dispatch(request());

        movieService.getAll().then(
            movies => dispatch(success(movies)),
            error => {
                if(error.status === 401){
                    dispatch(authActions.logout());
                }else{
                    dispatch(failure(error.message));
                }
            }
        );
    }

    function request() { return { type: movieTypes.FETCH_ALL_REQUEST } }
    function success(movies) { return { type: movieTypes.FETCH_ALL_SUCCESS, payload: movies } }
    function failure(error) { return { type: movieTypes.FETCH_ALL_FAILURE, payload: error } }
}

function fetchMovie(id,role) {

    return dispatch => {
        dispatch(request());
        movieService.getById(id, role).then(
            movie => dispatch(success(movie)),
            error => {
                if(error.status === 401){
                    dispatch(authActions.logout());
                }else{
                    dispatch(alertActions.error(error.message))
                    dispatch(failure(error.message));
                }
            }
        );
    }

    function request() { return { type: movieTypes.FETCH_REQUEST } }
    function success(movie) { return { type: movieTypes.FETCH_SUCCESS, payload: movie } }
    function failure(error) { return { type: movieTypes.FETCH_FAILURE, payload: error } }
}

function addMovie(data) {

    return dispatch => {
        dispatch(request());

        movieService.addMovie(data).then(
            movie => {
                dispatch(alertActions.success(movie.title+" added successfully."))
                dispatch(success(movie))
            },
            error => {
                if(error.status === 401){
                    dispatch(authActions.logout());
                }else{
                    dispatch(alertActions.error(error.message))
                    dispatch(failure(error.message));
                }
            }
        );
    }

    function request() { return { type: movieTypes.FORM_REQUEST } }
    function success(movie) { return { type: movieTypes.FORM_SUCCESS, payload: movie } }
    function failure(error) { return { type: movieTypes.FORM_FAILURE, payload: error } }
}

function deleteMovie(id) {

    return dispatch => {
        dispatch(request());

        movieService.deleteMovieById(id).then(
            movie => {
                dispatch(alertActions.success(movie.title+" deleted successfully."))
                dispatch(success(movie))
            },
            error => {
                if(error.status === 401){
                    dispatch(authActions.logout());
                }else{
                    dispatch(alertActions.error(error.message))
                    dispatch(failure(error.message));
                }
            }
        );
    }

    function request() { return { type: movieTypes.DELETE_REQUEST } }
    function success(movie) { return { type: movieTypes.DELETE_SUCCESS, payload: movie } }
    function failure(error) { return { type: movieTypes.DELETE_FAILURE, payload: error } }
}

function updateMovie(id, data) {

    return dispatch => {
        dispatch(request());

        movieService.updateMovie(id, data).then(
            movie => {
                dispatch(alertActions.success(movie.title+" update successfully."))
                dispatch(success(movie))
            },
            error => {
                if(error.status === 401){
                    dispatch(authActions.logout());
                }else{
                    dispatch(alertActions.error(error.message))
                    dispatch(failure(error.message));
                }
            }
        );
    }

    function request() { return { type: movieTypes.FORM_REQUEST } }
    function success(movie) { return { type: movieTypes.FORM_SUCCESS, payload: movie } }
    function failure(error) { return { type: movieTypes.FORM_FAILURE, payload: error } }
}

function fetchPopular(limit){
    return dispatch => {
        dispatch(request());

        movieService.getByRating(limit).then(
            movies => dispatch(success(movies)),
            error => {
                if(error.status === 401){
                    tokenService.getToken().then(
                        token => localStorage.setItem('token', JSON.stringify(token)),
                        error => failure(error.message)
                    )
                }else{
                    dispatch(failure(error.message));
                }
            }
        );
    }

    function request() { return { type: movieTypes.FETCH_POPULAR_REQUEST } }
    function success(movies) { return { type: movieTypes.FETCH_POPULAR_SUCCESS, payload: movies } }
    function failure(error) { return { type: movieTypes.FETCH_POPULAR_FAILURE, payload: error } }
}

function fetchGenreMovies(genre, limit){
    return dispatch => {
        dispatch(request());

        movieService.getByGenre(genre, limit).then(
            movies => dispatch(success(movies)),
            error => {
                console.log(error)
                debugger
                if(error.status === 401){
                    tokenService.getToken().then(
                        token => localStorage.setItem('token', JSON.stringify(token)),
                        error => failure(error.message)
                    )
                }else{
                    dispatch(failure(error.message));
                }
            }
        );
    }

    function request() { return { type: movieTypes.FETCH_ALL_REQUEST } }
    function success(movies) { return { type: movieTypes.FETCH_ALL_SUCCESS, payload: movies } }
    function failure(error) { return { type: movieTypes.FETCH_ALL_FAILURE, payload: error } }
}

function fetchNewReleased(limit){
    return dispatch => {
        dispatch(request());

        movieService.getByReleased(limit).then(
            movies => dispatch(success(movies)),
            error => {
                if(error.status === 401){
                    tokenService.getToken().then(
                        token => localStorage.setItem('token', JSON.stringify(token)),
                        error => failure(error.message)
                    )
                }else{
                    dispatch(failure(error.message));
                }
            }
        );
    }

    function request() { return { type: movieTypes.FETCH_RELEASED_REQUEST } }
    function success(movies) { return { type: movieTypes.FETCH_RELEASED_SUCCESS, payload: movies } }
    function failure(error) { return { type: movieTypes.FETCH_RELEASED_FAILURE, payload: error } }
}

function searchMovies(searchText) {

    return dispatch => {
        dispatch(request());

        movieService.searchMoviesByTitle(searchText).then(
            movies => dispatch(success(movies)),
            error => {
                if(error.status === 401){
                    dispatch(authActions.logout());
                }else{
                    dispatch(failure(error.message));
                }
            }
        );
    }

    function request() { return { type: movieTypes.FETCH_ALL_REQUEST } }
    function success(movies) { return { type: movieTypes.FETCH_ALL_SUCCESS, payload: movies } }
    function failure(error) { return { type: movieTypes.FETCH_ALL_FAILURE, payload: error } }
}