import {
    FETCH_FORMS,
    FETCH_SINLGE_FORM,
    POST_FORM,
    DELETE_FORM,
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

      case POST_FORM:
        console.log('Action', action.payload)
        // TODO - add new form to list
        return Object.assign({}, state, {
          list: [...state.list, action.payload.data],
        }); 

      case DELETE_FORM: 
        console.log('Action', action.payload)
        // TODO - add new form to list
        const { id } = action.payload;
        console.log('ID', id)
        return Object.assign({}, state, {
          selected: null,
          list: state.list.filter(form => form._id.$oid !== id),
        });
    
      default:
        return state;
    }
};
  
  export default formReducer;