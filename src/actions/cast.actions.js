import { castTypes } from '../constants';
import { castService } from '../services';
import { alertActions } from './alert.actions';
import { authActions } from './auth.actions';

export const castActions = {
    fetchCasts,
    fetchCast,
    addCast,
    deleteCast,
    updateCast
}

// Gell all casting members
function fetchCasts(){
    return dispatch => {
        dispatch(request());
        castService.getAll().then(
            persons => {
                dispatch(success(persons))
            },
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
    function request(){ return { type: castTypes.FETCH_ALL_REQUEST } }   
    function success(persons){ return { type: castTypes.FETCH_ALL_SUCCESS, payload: persons } }  
    function failure(error){ return { type: castTypes.FETCH_ALL_FAILURE, payload: error } }
}

// Fetch casting member by id
function fetchCast(id) {

    return dispatch => {
        dispatch(request());

        castService.getById(id).then(
            person => dispatch(success(person)),
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

    function request() { return { type: castTypes.FETCH_REQUEST } }
    function success(person) { return { type: castTypes.FETCH_SUCCESS, payload: person } }
    function failure(error) { return { type: castTypes.FETCH_FAILURE, payload: error } }
}

// Add new casting member
function addCast(data){
    return dispatch => {
        dispatch(request());

        castService.addCast(data).then(
            person => {
                dispatch(alertActions.success(data.name+" added successfully."));
                dispatch(success(person));
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

    function request() { return { type: castTypes.FORM_REQUEST } }
    function success(person) { return { type: castTypes.FORM_SUCCESS, payload: person } }
    function failure(error) { return { type: castTypes.FORM_FAILURE, payload: error } }
}

// Delete casting member
function deleteCast(id) {

    return dispatch => {
        dispatch(request());

        castService.deleteCast(id).then(
            person => {
                dispatch(alertActions.success(person.name+" deleted successfully."))
                dispatch(success(person))
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

    function request() { return { type: castTypes.DELETE_REQUEST } }
    function success(person) { return { type: castTypes.DELETE_SUCCESS, payload: person } }
    function failure(error) { return { type: castTypes.DELETE_FAILURE, payload: error } }
}

// Update cast
function updateCast(id, data) {

    return dispatch => {
        dispatch(request());

        castService.updateCast(id, data).then(
            person => {
                dispatch(alertActions.success(person.name+" update successfully."))
                dispatch(success(person))
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

    function request() { return { type: castTypes.FORM_REQUEST } }
    function success(person) { return { type: castTypes.FORM_SUCCESS, payload: person } }
    function failure(error) { return { type: castTypes.FORM_FAILURE, payload: error } }
}