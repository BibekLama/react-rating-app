import { castTypes } from '../constants';

const initialState = {
    casts: [],
    loading: false,
    error: null
}

function casts(state=initialState, action){

    switch (action.type) {
        case castTypes.FETCH_ALL_REQUEST:
            return{
                ...state,
                loading: true
            }
        
        case castTypes.FETCH_ALL_SUCCESS:
            return{
                ...state,
                loading: false,
                casts: action.payload,
                error: null
            }

        case castTypes.FETCH_ALL_FAILURE:
            return{
                ...state,
                loading: false,
                casts: [],
                error: action.payload
            }

        case castTypes.DELETE_SUCCESS:
                return {
                    ...state,
                    loading: false,
                    casts: state.casts.filter(item => action.payload.id !== item.id),
                    error: null
                };

        default: return state
    }
}

export default casts;