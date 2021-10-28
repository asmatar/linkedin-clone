import { SET_USER } from '../actions';

const InitialState = {
    user: null,
};

const userReducer = (state= InitialState, action) => {
    // login 5 . take the action we've imported and change the state
    switch (action.type){
        case SET_USER:
            return {
                ...state,
                user: action.user
            }   
            default:
                return state
            }
}

export default userReducer;