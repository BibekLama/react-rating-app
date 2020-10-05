import { genreTypes } from '../constants';
import { genreService } from '../services';
import { alertActions } from './alert.actions';
import { authActions } from './auth.actions';

export const genreActions = {
    fetchGenres,
    fetchGenre,
    addGenre,
    deleteGenre,
    updateGenre,
    fetchGenreChart
}

// Gell all genres
function fetchGenres(role){
    return dispatch => {
        dispatch(request());
        genreService.getAll(role).then(
            genres => dispatch(success(genres)),
            error => {
                if(error.status === 401){
                    dispatch(authActions.logout());
                }else{
                    dispatch(alertActions.error(error.message))
                    dispatch(failure(error.message));
                }
            }
        )
    }
    function request(){ return { type: genreTypes.FETCH_ALL_REQUEST } }   
    function success(genres){ return { type: genreTypes.FETCH_ALL_SUCCESS, payload: genres } }  
    function failure(error){ return { type: genreTypes.FETCH_ALL_FAILURE, payload: error } }
}

// Fetch genre by id
function fetchGenre(id) {

    return dispatch => {
        dispatch(request());

        genreService.getById(id).then(
            genre => dispatch(success(genre)),
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

    function request() { return { type: genreTypes.FETCH_REQUEST } }
    function success(genre) { return { type: genreTypes.FETCH_SUCCESS, payload: genre } }
    function failure(error) { return { type: genreTypes.FETCH_FAILURE, payload: error } }
}

// Add new genre
function addGenre(data){
    return dispatch => {
        dispatch(request());

        genreService.addGenre(data).then(
            genre => {
                dispatch(alertActions.success(data.name+" added successfully."));
                dispatch(success(genre));
            },
            error => {
                if(error.status === 401){
                    dispatch(authActions.logout());
                }else{
                    dispatch(alertActions.error(error.message));
                    dispatch(failure(error.message));
                }
            }
        )
    }

    function request() { return { type: genreTypes.FORM_REQUEST } }
    function success(genre) { return { type: genreTypes.FORM_SUCCESS, payload: genre } }
    function failure(error) { return { type: genreTypes.FORM_FAILURE, payload: error } }
}

// Delete genre
function deleteGenre(id) {

    return dispatch => {
        dispatch(request());

        genreService.deleteGenre(id).then(
            genre => {
                dispatch(alertActions.success(genre.name+" deleted successfully."))
                dispatch(success(genre))
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

    function request() { return { type: genreTypes.DELETE_REQUEST } }
    function success(genre) { return { type: genreTypes.DELETE_SUCCESS, payload: genre } }
    function failure(error) { return { type: genreTypes.DELETE_FAILURE, payload: error } }
}

// Update genre
function updateGenre(id, data) {

    return dispatch => {
        dispatch(request());

        genreService.updateGenre(id, data).then(
            genre => {
                dispatch(alertActions.success(genre.name+" update successfully."))
                dispatch(success(genre))
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

    function request() { return { type: genreTypes.FORM_REQUEST } }
    function success(genre) { return { type: genreTypes.FORM_SUCCESS, payload: genre } }
    function failure(error) { return { type: genreTypes.FORM_FAILURE, payload: error } }
}

function fetchGenreChart(){

    
    return dispatch => {
        dispatch(request());

        genreService.genreMovieCount().then(
            data => {
                dispatch(success(data))
            },
            error => {
                if(error.status === 401){
                    dispatch(authActions.logout());
                }else{
                    dispatch(failure(error.message));
                }
            }
        );
    }

    function request() { return { type: genreTypes.CHART_REQUEST } }
    function success(data) { return { type: genreTypes.CHART_SUCCESS, payload: data } }
    function failure(error) { return { type: genreTypes.CHART_FAILURE, payload: error } }
}