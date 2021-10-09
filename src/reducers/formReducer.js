import {
    FETCH_FORMS,
    FETCH_SINLGE_FORM,
    POST_FORM,
    DELETE_FORM,
    ADD_FIELD,
    SET_FORM,
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
      // {id: '11', subItems: [1, 2]},
      {rowId: '11', columnId: [{colId: '1'}, {colId: '2'}]},
      {rowId: '21', columnId: [{colId: '1'}, {colId: '2'}]}

    ],

    structuredForm2: {
      '11': {
        id: '11',
        columns: {
          '1': {
            id: '1',
            label: 'First Name',
            name: '',
            type: '',
          },
          '2': {
            id: '2',
            label: 'Last Name',
            name: '',
            type: '',
          },
        }
      },

      '21': {
        id: '21',
        columns: {
          '3': {
            id: '3',
            label: 'Phone',
            name: '',
            type: '',
          },
        '4': {
            id: '4',
            label: 'Email',
            name: '',
            type: '',
          },
        }
      }
    }

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
          list: state.list.filter(form => form.id !== id),
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
        const { obj } = action.payload;
        return Object.assign({}, state, {
          structuredForm2: obj
        });
      }
      
      case SET_FORM: {
        const { arr } = action.payload;
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