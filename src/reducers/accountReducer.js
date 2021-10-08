import {
    LOGIN_SUCCESS,
    CREATE_ACCOUNT,
    CREATE_ACCOUNT_FAILED, 
    CLEAR_ERROR_MESSAGE, 
    SILENT_LOGIN,
    LOGOUT,
} from '../actions/accountActions'

const initialState = {
    auth: false,
    user: null,
    errorMessage: ''
  };
  
const accountReducer = (state = initialState, action) => {
    switch (action.type) {

      case SILENT_LOGIN: {
        const { user, auth } = action.payload;
        console.log('SILENT LOGIN')
        return Object.assign({}, state, {
            user,
            auth
        })
      }
    
      case LOGIN_SUCCESS:{
        const { user, auth } = action.payload;
        return Object.assign({}, state, {
          user,
          auth
        })
      }

      case CREATE_ACCOUNT:{
        const { user, auth } = action.payload;
        return Object.assign({}, state, {
          user,
          auth
        })
      } 

      case CREATE_ACCOUNT_FAILED: {
        return Object.assign({}, state, {
            errorMessage: action.payload
        })
      }

      case CLEAR_ERROR_MESSAGE: {
        return Object.assign({}, state, {
            errorMessage: ''
        })
      }

      case LOGOUT: {
        return Object.assign({}, state, {
            user: null,
            auth: false,
            errorMessage: '',
        })
      }
    
      default:
        return state;
    }
};
  
  export default accountReducer;