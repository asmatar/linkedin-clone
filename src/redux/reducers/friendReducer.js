import { GET_FRIENDS } from '../actions';

export const initialState = {
    friends: [],
}

const friendReducer = (state= initialState, action) => {
    // login 5 . take the action we've imported and change the state
    switch (action.type){
        case  GET_FRIENDS:
            return {
                ...state,
                friends: action.payload
            }
        default:
        return state
    }
}

export default friendReducer;