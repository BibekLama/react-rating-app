import { genreTypes } from '../constants';

const initialState = {
    genre: null,
    loading: false,
    error: null
}

function genre(state=initialState, action){

    switch (action.type) {
        case genreTypes.FETCH_REQUEST:
            return{
                ...state,
                loading: true
            }
        
        case genreTypes.FETCH_SUCCESS:
            return{
                ...state,
                loading: false,
                genre: action.payload,
                error: null
            }

        case genreTypes.FETCH_FAILURE:
            return{
                ...state,
                loading: false,
                genre: null,
                error: action.payload
            }

        default: return state
    }
}

export default genre;