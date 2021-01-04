import {
    FETCH_FORMS,
    FETCH_SINLGE_FORM,
  } from '../actions/formActions'

const initialState = {
    list: [],
    selected: null
  };
  
const formReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_FORMS:
          console.log('Action', action.payload)
        return Object.assign({}, state, {
            list: action.payload,
            selected: action.payload[0]
        });
      
      case FETCH_SINLGE_FORM:
        return Object.assign({}, state, {
          selected:  action.payload
      }); 
    
      default:
        return state;
    }
};
  
  export default formReducer;