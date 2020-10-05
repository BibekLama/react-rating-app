import { movieTypes } from '../constants';

const initialState ={
    movie: null,
    loading: false,
    error: null
}

function deleteMovie(state = initialState, action){
    switch (action.type) {
        case movieTypes.DELETE_REQUEST:
            return {
                ...state,
                loading: true
            };

        case movieTypes.DELETE_SUCCESS:
            return {
                ...state,
                loading: false,
                movie: action.payload,
                error: null
            };

        case movieTypes.DELETE_FAILURE:
            return {
                ...state,
                loading: false,
                movie: null,
                error: action.payload
            };

        default:
                return state
    }
}

export default deleteMovie;