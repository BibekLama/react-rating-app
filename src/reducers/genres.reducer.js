import { genreTypes } from '../constants';

const initialState = {
    genres: [],
    loading: false,
    error: null
}

function genres(state=initialState, action){

    switch (action.type) {
        case genreTypes.FETCH_ALL_REQUEST:
            return{
                ...state,
                loading: true
            }
        
        case genreTypes.FETCH_ALL_SUCCESS:
            return{
                ...state,
                loading: false,
                genres: action.payload,
                error: null
            }

        case genreTypes.FETCH_ALL_FAILURE:
            return{
                ...state,
                loading: false,
                genres: [],
                error: action.payload
            }

        case genreTypes.DELETE_SUCCESS:
                return {
                    ...state,
                    loading: false,
                    genres: state.genres.filter(item => action.payload._id !== item._id),
                    error: null
                };

        default: return state
    }
}

export default genres;