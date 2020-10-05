import { ratingTypes } from '../constants';

const initialState = {
    ratings: [],
    loading: false,
    error: null
}

function ratings(state=initialState, action){

    switch (action.type) {
        case ratingTypes.FETCH_MOVIE_RATINGS_REQUEST:
            return{
                ...state,
                loading: true
            }
        
        case ratingTypes.FETCH_MOVIE_RATINGS_SUCCESS:
            return{
                ...state,
                loading: false,
                ratings: action.payload,
                error: null
            }

        case ratingTypes.FETCH_MOVIE_RATINGS_FAILURE:
            return{
                ...state,
                loading: false,
                ratings: [],
                error: action.payload
            }

        default: return state
    }
}

export default ratings;