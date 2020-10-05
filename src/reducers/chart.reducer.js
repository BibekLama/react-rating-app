import { genreTypes } from '../constants';

const initialState = {
    data: [],
    loading: false,
    error: null
}

function chart(state=initialState, action){

    switch (action.type) {
        case genreTypes.CHART_REQUEST:
            return{
                ...state,
                loading: true
            }
        
        case genreTypes.CHART_SUCCESS:
            return{
                ...state,
                loading: false,
                data: action.payload,
                error: null
            }

        case genreTypes.CHART_FAILURE:
            return{
                ...state,
                loading: false,
                data: [],
                error: action.payload
            }

        default: return state
    }
}

export default chart;