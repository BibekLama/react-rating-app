import { movieTypes } from '../constants';

const initialState = {
    movies: [],
    loading: false,
    error: null
}

function movies(state=initialState, action){

    switch (action.type) {
        case movieTypes.FETCH_ALL_REQUEST:
            return{
                ...state,
                loading: true
            }
        
        case movieTypes.FETCH_ALL_SUCCESS:
            return{
                ...state,
                loading: false,
                movies: action.payload,
                error: null
            }

        case movieTypes.FETCH_ALL_FAILURE:
            return{
                ...state,
                loading: false,
                movies: [],
                error: action.payload
            }

        case movieTypes.DELETE_SUCCESS:
                return {
                    ...state,
                    loading: false,
                    movies: state.movies.filter(item => action.payload.id !== item.id),
                    error: null
                };

        default: return state
    }
}

export default movies;