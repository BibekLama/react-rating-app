import { userTypes } from '../constants'

const initialState = {
    user: null,
    loading: false,
    error: null
}

function user(state=initialState, action){

    switch (action.type) {
        case userTypes.SIGNUP_REQUEST:
            return{
                ...state,
                loading: true
            }
        
        case userTypes.SIGNUP_SUCCESS:
            return{
                ...state,
                loading: false,
                user: action.payload,
                error: null
            }

        case userTypes.SIGNUP_FAILURE:
            return{
                ...state,
                loading: false,
                user: null,
                error: action.payload
            }

        default: return state
    }
}

export default user;