import {
    LOGIN_SUCCESS,
    
  } from '../actions/accountActions'

const initialState = {
    auth: true
  };
  
const accountReducer = (state = initialState, action) => {
    switch (action.type) {
    
      case LOGIN_SUCCESS:
        console.log('yo')
        return Object.assign({}, state, {
            auth: true
        })
    
      default:
        return state;
    }
};
  
  export default accountReducer;