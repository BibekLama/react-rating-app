import { ratingTypes } from '../constants';

const initialState = {
    rating: null,
    loading: false,
    error: null
}

function rating(state=initialState, action){

    switch (action.type) {
        case ratingTypes.ADD_RATING_REQUEST:
            return{
                ...state,
                loading: true
            }
        
        case ratingTypes.ADD_RATING_SUCCESS:
            return{
                ...state,
                loading: false,
                rating: action.payload,
                error: null
            }

        case ratingTypes.ADD_RATING_FAILURE:
            return{
                ...state,
                loading: false,
                ratings: null,
                error: action.payload
            }

        default: return state
    }
}

export default rating;