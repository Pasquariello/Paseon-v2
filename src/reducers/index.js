import { combineReducers } from 'redux';
import accountReducer from './accountReducer';
import formReducer from './formReducer';

const rootReducer = combineReducers({
    account: accountReducer,
    forms: formReducer,
});

export default rootReducer;