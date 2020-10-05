import { movieTypes } from '../constants';

const initialState = {
    movies: [],
    loading: false,
    error: null
}

function popular(state=initialState, action){

    switch (action.type) {
        case movieTypes.FETCH_POPULAR_REQUEST:
            return{
                ...state,
                loading: true
            }
        
        case movieTypes.FETCH_POPULAR_SUCCESS:
            return{
                ...state,
                loading: false,
                movies: action.payload,
                error: null
            }

        case movieTypes.FETCH_POPULAR_FAILURE:
            return{
                ...state,
                loading: false,
                movies: [],
                error: action.payload
            }

        default: return state
    }
}

export default popular;