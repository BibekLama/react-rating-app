import { castTypes } from '../constants';

const initialState = {
    cast: null,
    loading: false,
    error: null
}

function cast(state=initialState, action){

    switch (action.type) {
        case castTypes.FETCH_REQUEST:
            return{
                ...state,
                loading: true
            }
        
        case castTypes.FETCH_SUCCESS:
            return{
                ...state,
                loading: false,
                cast: action.payload,
                error: null
            }

        case castTypes.FETCH_FAILURE:
            return{
                ...state,
                loading: false,
                cast: null,
                error: action.payload
            }

        default: return state
    }
}

export default cast;