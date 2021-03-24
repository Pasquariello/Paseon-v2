import {
    LOGIN_SUCCESS,
    CREATE_ACCOUNT,
    CREATE_ACCOUNT_FAILED, 
    CLEAR_ERROR_MESSAGE,  
} from '../actions/accountActions'

const initialState = {
    auth: true,
    user: null,
    errorMessage: ''
  };
  
const accountReducer = (state = initialState, action) => {
    switch (action.type) {
    
      case LOGIN_SUCCESS:
        return Object.assign({}, state, {
            auth: true
      })

      case CREATE_ACCOUNT:
        return Object.assign({}, state, {
            user: action.payload
      })

      case CREATE_ACCOUNT_FAILED:
        return Object.assign({}, state, {
            errorMessage: action.payload
      })

      case CLEAR_ERROR_MESSAGE:
        return Object.assign({}, state, {
            errorMessage: ''
      })
    
      default:
        return state;
    }
};
  
  export default accountReducer;