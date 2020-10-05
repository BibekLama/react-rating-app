import { castTypes } from '../constants';

const initialState ={
    cast: null,
    loading: false,
    error: null
}

function castForm(state = initialState, action){
    switch (action.type) {
        case castTypes.FORM_REQUEST:
            return {
                ...state,
                loading: true
            };

        case castTypes.FORM_SUCCESS:
            return {
                ...state,
                loading: false,
                cast: action.payload,
                error: null
            };

        case castTypes.FORM_FAILURE:
            return {
                ...state,
                loading: false,
                cast: null,
                error: action.payload
            };

        default:
                return state
    }
}

export default castForm;