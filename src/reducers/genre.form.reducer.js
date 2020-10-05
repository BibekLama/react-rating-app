import { genreTypes } from '../constants';

const initialState ={
    genre: null,
    loading: false,
    error: null
}

function genreForm(state = initialState, action){
    switch (action.type) {
        case genreTypes.FORM_REQUEST:
            return {
                ...state,
                loading: true
            };

        case genreTypes.FORM_SUCCESS:
            return {
                ...state,
                loading: false,
                genre: action.payload,
                error: null
            };

        case genreTypes.FORM_FAILURE:
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

export default genreForm;