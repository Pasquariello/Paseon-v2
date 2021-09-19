import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";

// interface FormData {
//     id: string;
//     user_id: string;
//     name: string;
//     rows: Array<any>;
//     columns: Array<any>;
//     // fields: Array<Object>
//     // columns: Array<Object>,
//   }

  enum formReqState {
    DEFUALT,
    LOADING,
    SUCCESS,
    ERROR
  }

export const fetchFormData = createAsyncThunk('formDetails/fetchFormData', async () => {
  const response =  {
    id: 'form1',
    user_id: '1',
    name: 'My Test Form',
    rows: [
      {
        id: 'row0',
        position: 0,
        formId: 'form1',
        columns: ['col0'],
      },
    ],
    columns: [
      {
        id: 'col0',
        rowId: 'row0',
        formId: 'form1',
        position: 0,
        //Field info
        name: '',
        label:  'first Name',
        type: 'text',
      },
    ]
  }
  return response

});

const arrayToObject = (array: Array<any>) =>
   array.reduce((obj: any, item: any) => {
     obj[item.id] = item
     return obj
   }, {})


export const slice = createSlice({
  name: "formDetails",
  initialState: {
      selectedField: '',
      status: formReqState.DEFUALT,
      loading: false,

      name: '',
      columns: [] as Array<any>,
      rows: [] as Array<any>,
      columnEntities: {} as any,
      rowEntities: {},
  },
  reducers: {
    addField(state, action) {
      console.log('ACTIVE FIELD')
        // if (!state.activeForm){
          console.log(' action.payload', action.payload)
            // state.activeForm = action.payload.id

            // const { row, column, ...formData } = action.payload;
            const rowId = action.payload.row.id;
            const colId = action.payload.column.id;

            console.log('FORM DATA', action.payload);
            state.rows = [...state.rows, action.payload.row];
            state.rowEntities = {...state.rowEntities, [rowId]: action.payload.row};

            // state.columns = [...state.columns, action.payload.column]
            state.columnEntities = {...state.columnEntities, [colId]: action.payload.column};
    },
    moveRow(state, action) {
      console.log('action.payload.row',  action.payload)
      state.rows = action.payload;
      const rowEntities = arrayToObject(action.payload);
      state.rowEntities = rowEntities;

      // rowsAdapter.setAll(state,  action.payload)
    },

    moveCol(state, action) {
      const rowId = action.payload.updatedRow.id
      const updatedRowEntities: any =  {...state.rowEntities, [rowId]: action.payload.updatedRow}
      const updatedRowArray = Object.keys(updatedRowEntities).map((k) => updatedRowEntities[k])

      state.rowEntities = updatedRowEntities;
      state.rows = updatedRowArray;

      const updatedColumns =  action.payload.updatedColumns;

      updatedColumns.forEach((col: any) => {
        const colId =  col.id;
        const foo: any = state.columnEntities[colId]
       state.columnEntities = {
         ...state.columnEntities, 
         [col.id]: {
            ...foo,
            ...col.changes
          }
        }
      });

      //
      
      // const obj = action.payload.updatedRowEntities
      // let rows = Object.keys(obj).map((k) => obj[k])

      // state.rows = rows;
      // state.rowEntities = action.payload.updatedRowEntities;

      // const cols = rows
      // .map(row => row.columns)
      // .reduce(
      //   (arr, elem) => arr.concat(elem), []
      // )
      // const columnEntities = arrayToObject(cols);

      // state.columnEntities = columnEntities;
      // let columns = Object.keys(obj).map((k) => obj[k])
      // state.columns = columns

  }, 

    updateForm(state, action) {
        // formDetailsAdapter.updateOne(state, action.payload)
    },
    selectField(state, action) {
      state.selectedField = action.payload;
    },
  },
  extraReducers:(builder) => {
    builder.addCase(fetchFormData.fulfilled, (state, action) => {
      const {id, user_id, name, rows} = action.payload;

      // const cols = rows
      // .map(row => row.columns)
      // .reduce(
      //   (arr, elem) => arr.concat(elem), []
      // )
      const columnEntities = arrayToObject(action.payload.columns);
      const rowEntities = arrayToObject(action.payload.rows);

      state.name = name;
      state.rows = [...state.rows, ...rows]
      state.columns = [...state.columns, ...action.payload.columns]
      state.columnEntities = columnEntities;
      state.rowEntities = rowEntities;
    });

  }
});

const reducer = slice.reducer;
export default reducer;
export const { 
  addField, 
  moveCol,
  moveRow,
  selectField,
} = slice.actions;
