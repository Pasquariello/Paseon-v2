import {
    FETCH_FORMS,
    FETCH_SINLGE_FORM,
    POST_FORM,
    DELETE_FORM,
    ADD_FIELD,
    UPDATE_LIST,
    SELECT_FIELD
  } from '../actions/formActions'

const initialState = {
    list: [],
    selected: {
      id: '',
      title: '',
      fields: []
    },
    selectedField: null,
  
    structuredForm: [
      {id: '11', subItems: []}
    ]

  };
  
const formReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_FORMS: {
        return Object.assign({}, state, {
            list: action.payload,
            // selected: action.payload[0]
        });
      }
      
      case FETCH_SINLGE_FORM:{
        return Object.assign({}, state, {
          selected:  action.payload
        }); 
      }

      case POST_FORM:{
        // TODO - add new form to list
        return Object.assign({}, state, {
          list: [...state.list, action.payload.data],
        }); 
      }  

      case DELETE_FORM: {
        // TODO - add new form to list
        const { id } = action.payload;
        return Object.assign({}, state, {
          selected: null,
          list: state.list.filter(form => form._id.$oid !== id),
        });
      }

      //old - delete
      // case ADD_FIELD: {
      //   const { field } = action.payload;

      //   return Object.assign({}, state, {
      //     selected: {
      //       ...state.selected,
      //       fields: [...state.selected.fields, field ]
      //     }
      //   });
      // }

      case ADD_FIELD: {
        const { arr } = action.payload;
        console.log('reducer', arr)
        return Object.assign({}, state, {
          structuredForm: arr
        });
      }
      

      case UPDATE_LIST: {
        const { list } = action.payload;
        // const {name, value, id} = action.payload;
      //   const newList = state.selected.fields.map(field => {
      //     if (field.id === id) {
      //         return {...field, ['label']:  value}
      //     }
      //     return field
      // })
        return Object.assign({}, state, {
          structuredForm: list
        });
      }

      case SELECT_FIELD: {
        const { rowId, colId } = action.payload;
        
        const row = state.structuredForm.find(row => row.id === rowId)
        const field = row.subItems.find(col => col.id === colId)
        return Object.assign({}, state, {

          selectedField: {
            rowId, 
            colId
          }
        });
      }


      default: {
        return state;
        }
    }
};
  
  export default formReducer;