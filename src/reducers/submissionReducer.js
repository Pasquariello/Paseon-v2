import {
  FETCH_FORM_SUBMISSIONS,
  FETCH_FORM_SUBMISSIONS_COUNT,
  } from '../actions/submissionActions'

const initialState = {
    list: [],
    selected: null,
    form_submission_count: [],
  };
  
const submissionReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_FORM_SUBMISSIONS:
        return Object.assign({}, state, {
            list: action.payload,
            selected: action.payload[0] // might need to make a conditional?
        });
      
      case FETCH_FORM_SUBMISSIONS_COUNT:
        return Object.assign({}, state, {
          form_submission_count: action.payload,
      });
    
      default:
        return state;
    }
};
  
  export default submissionReducer;