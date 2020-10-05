import {userTypes} from '../constants';
import { userService } from '../services';
import { alertActions } from './alert.actions';

export const userActions = {
    fetchUser,
    signUpUser
}

// Action to fetch user by id
function fetchUser(id, role){
    return (dispatch) => {
        dispatch(request());
        userService.getById(id, role)
        .then( 
            user => dispatch(success(user)),
            error => dispatch(failure(error))
        );
    }

    function request(){ return { type: userTypes.FETCH_USER_REQUEST } }   
    function success(user){ return { type: userTypes.FETCH_USER_SUCCESS, payload: user } }  
    function failure(error){ return { type: userTypes.FETCH_USER_FAILURE, payload: error } }
}

function signUpUser(data){
    return (dispatch) => {
        dispatch(request());
        userService.addUser(data)
        .then( 
            user => {
                dispatch(alertActions.success("User registered successfully."));
                dispatch(success(user))
            },
            error => {
                dispatch(alertActions.error(error.message));
                dispatch(failure(error))
            }
        );
    }

    function request(){ return { type: userTypes.SIGNUP_REQUEST } }   
    function success(user){ return { type: userTypes.SIGNUP_SUCCESS, payload: user } }  
    function failure(error){ return { type: userTypes.SIGNUP_FAILURE, payload: error } }
}