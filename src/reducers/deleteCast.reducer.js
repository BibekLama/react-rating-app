import { castTypes } from '../constants';

const initialState ={
    cast: null,
    loading: false,
    error: null
}

function deleteCast(state = initialState, action){
    switch (action.type) {
        case castTypes.DELETE_REQUEST:
            return {
                ...state,
                loading: true
            };

        case castTypes.DELETE_SUCCESS:
            return {
                ...state,
                loading: false,
                cast: action.payload,
                error: null
            };

        case castTypes.DELETE_FAILURE:
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

export default deleteCast;