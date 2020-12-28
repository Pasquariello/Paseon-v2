import {
    FETCH_FORMS,
    
  } from '../actions/formActions'

const initialState = {
    list: []
  };
  
const formReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_FORMS:
          console.log('Action', action.payload)
        return Object.assign({}, state, {
            list: action.payload
        });
    
      default:
        return state;
    }
};
  
  export default formReducer;