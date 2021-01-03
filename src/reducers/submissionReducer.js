import {
  FETCH_FORM_SUBMISSIONS,
    
  } from '../actions/submissionActions'

const initialState = {
    list: [],
    selected: null
  };
  
const submissionReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_FORM_SUBMISSIONS:
          console.log('Action', action.payload)
        return Object.assign({}, state, {
            list: action.payload,
            selected: action.payload[0] // might need to make a conditional?
        });
    
      default:
        return state;
    }
};
  
  export default submissionReducer;