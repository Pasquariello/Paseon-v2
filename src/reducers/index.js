import { combineReducers } from 'redux';
import accountReducer from './accountReducer';
import formReducer from './formReducer';
import submissionReducer from './submissionReducer';


const rootReducer = combineReducers({
    account: accountReducer,
    forms: formReducer,
    submissions: submissionReducer,
});

export default rootReducer;