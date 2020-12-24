import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import accountReducer from './accountReducer';

const rootReducer = combineReducers({
    account: accountReducer,
});

export default rootReducer;