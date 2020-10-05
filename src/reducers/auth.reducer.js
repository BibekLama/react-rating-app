import {authTypes} from '../constants';

const initialState = {
    user: null,
    loading: false,
    error: null,
    isAuthenticated: false
}

function auth(state=initialState, action){

    switch (action.type) {
        case authTypes.LOGIN_REQUEST:
            return{
                ...state,
                loading: true
            }
        
        case authTypes.LOGIN_SUCCESS:
            return{
                ...state,
                loading: false,
                user: action.payload,
                isAuthenticated: action.payload ? true : false,
                error: null
            }

        case authTypes.LOGIN_FAILURE:
            return{
                ...state,
                loading: false,
                user: null,
                isAuthenticated: false,
                error: action.payload
            }

        case authTypes.LOGOUT:
            return{
                ...state,
                loading: false,
                user: null,
                isAuthenticated: false,
                error: null
            }

        default: return state
    }
}

export default auth;