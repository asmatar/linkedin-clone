import { GET_ARTICLES, SET_LOADING_STATUS } from '../actions';

export const initialState = {
    articles: [],
    loading: false,
}

const articleReducer = (state= initialState, action) => {
    // login 5 . take the action we've imported and change the state
    switch (action.type){
        case  GET_ARTICLES:
            return {
                ...state,
                articles: action.payload
            }
        case SET_LOADING_STATUS:
            return {
                ...state,
                loading: action.status
            }
        default:
        return state
    }
}

export default articleReducer;