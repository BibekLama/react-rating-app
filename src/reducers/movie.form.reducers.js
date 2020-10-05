import { movieTypes } from '../constants';

const initialState ={
    movie: null,
    loading: false,
    error: null
}

function movieForm(state = initialState, action){
    switch (action.type) {
        case movieTypes.FORM_REQUEST:
            return {
                ...state,
                loading: true
            };

        case movieTypes.FORM_SUCCESS:
            return {
                ...state,
                loading: false,
                movie: action.payload,
                error: null
            };

        case movieTypes.FORM_FAILURE:
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

export default movieForm;