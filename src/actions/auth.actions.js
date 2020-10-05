import {authTypes} from '../constants';
import {authService, userService} from '../services';
import {alertActions} from './alert.actions';

export const authActions = {
    login,
    logout,
    autoLogin
};

// Authenticate user
function login(username, password, role){

    return dispatch => {
        dispatch(request());
        
        authService.login(username, password)
        .then(
            user => {  
                if(user.role.role === role){ 
                    dispatch(success(user));
                }else{
                    dispatch(failure('Unauthorized User'));
                    localStorage.removeItem('user');
                }
            },
            error => {
                dispatch(failure(error.message));
                dispatch(alertActions.error(error.message));
            }
        );

    }

    function request(){ return { type: authTypes.LOGIN_REQUEST } }   
    function success(user){ return { type: authTypes.LOGIN_SUCCESS, payload: user } }  
    function failure(error){ return { type: authTypes.LOGIN_FAILURE, payload: error } }
}

// Auto login action if user detail exists in local storage
function autoLogin(role){
    return dispatch => {
        dispatch(request());
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.token && user.token.access_token) {
            userService.getById(user.user.user_id)
            .then(
                user => {
                    if(user.role.role === role){                  
                        dispatch(success(user));
                    }else{
                        dispatch(failure('Unauthorized User'));
                        localStorage.removeItem('user');
                    }
                },
                error => {
                    if(error.status === 401){
                        dispatch(logout());
                    }else{
                        dispatch(failure(error.message));
                        dispatch(alertActions.error(error.message));
                    }
                }
            )
        }
    }

    function request(){ return { type: authTypes.LOGIN_REQUEST } }   
    function success(user){ return { type: authTypes.LOGIN_SUCCESS, payload: user } }  
    function failure(error){ return { type: authTypes.LOGIN_FAILURE, payload: error } }
}

// Logout action
function logout(){
    authService.logout();
    return { type: authTypes.LOGOUT };
}
