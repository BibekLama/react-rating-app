import { genreTypes } from '../constants';

const initialState ={
    genre: null,
    loading: false,
    error: null
}

function deleteGenre(state = initialState, action){
    switch (action.type) {
        case genreTypes.DELETE_REQUEST:
            return {
                ...state,
                loading: true
            };

        case genreTypes.DELETE_SUCCESS:
            return {
                ...state,
                loading: false,
                genre: action.payload,
                error: null
            };

        case genreTypes.DELETE_FAILURE:
            return {
                ...state,
                loading: false,
                genre: null,
                error: action.payload
            };

        default:
                return state
    }
}

export default deleteGenre;