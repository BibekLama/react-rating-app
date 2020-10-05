import { movieTypes } from '../constants';

const initialState = {
    movie: null,
    loading: false,
    error: null
}

function movie(state=initialState, action){

    switch (action.type) {
        case movieTypes.FETCH_REQUEST:
            return{
                ...state,
                loading: true
            }
        
        case movieTypes.FETCH_SUCCESS:
            return{
                ...state,
                loading: false,
                movie: action.payload,
                error: null
            }

        case movieTypes.FETCH_FAILURE:
            return{
                ...state,
                loading: false,
                movie: null,
                error: action.payload
            }

        default: return state
    }
}

export default movie;