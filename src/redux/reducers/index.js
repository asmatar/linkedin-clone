import { combineReducers } from 'redux';
import articleReducer from './articleReducer';
import friendReducer from './friendReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
    userState: userReducer,
    articleState: articleReducer,
    friendState: friendReducer
})

export default rootReducer