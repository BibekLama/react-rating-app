import {alertTypes} from '../constants';

function alert(state = { type:null, message: null}, action) {
    switch (action.type) {
        case alertTypes.SUCCESS:
            return {
                type: 'success',
                message: action.message
            };
        case alertTypes.ERROR:
            return {
                type: 'danger',
                message: action.message
            };
        case alertTypes.CLEAR:
            return {
                type: null,
                message: null
            };
        default:
            return state
    }
}

export default alert;