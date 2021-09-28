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
        colCount: 1,
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
      rowEntities: {}  as any,
  },
  reducers: {
    addField(state, action) {
      console.log('ACTIVE FIELD')
      console.log(' action.payload', action.payload)
      // this is if  array of row and array of col
      // const rowId = action.payload.row.id;
      // const colId = action.payload.column.id;

      // console.log('FORM DATA', action.payload);
      // state.rows = [...state.rows, action.payload.row];
      // state.rowEntities = {...state.rowEntities, [rowId]: action.payload.row};

      // state.columns = [...state.columns, action.payload.column]
      // state.columnEntities = {...state.columnEntities, [colId]: action.payload.column};

      // this is if col nested in row
      const rowId = action.payload.row.id;
      const colId = action.payload.column.id;
      state.rows = [...state.rows, action.payload.row];



    },
    moveRow(state, action) {
      console.log('action.payload.row',  action.payload)
      state.rows = action.payload;
      const rowEntities = arrayToObject(action.payload);
      state.rowEntities = rowEntities;


      action.payload.forEach((row: any) => {
        row.columns.forEach((colId: string) => {
          const index = state.columns.findIndex((stateColumn) => stateColumn.id === colId);
          state.columnEntities[colId] = {...state.columnEntities[colId], row: row.position}
          state.columns[index] = {...state.columns[index], row: row.position}
        });
      });
      // rowsAdapter.setAll(state,  action.payload)
    },

    moveCol(state, action) {
      const rowId = action.payload.updatedRow.id
      const updatedRowEntities: any =  {...state.rowEntities, [rowId]: action.payload.updatedRow}
      const updatedRowArray = Object.keys(updatedRowEntities).map((k) => updatedRowEntities[k])
      const index = action.payload.rowIndex;
      console.log('action.payload', action.payload)
      // state.rows = action.payload.updatedRow;
      state.rows[index] = action.payload.updatedRow

      // state.rowEntities = updatedRowEntities;
      // state.rows = updatedRowArray;

      // const updatedColumns =  action.payload.updatedColumns;


      // updatedColumns.forEach((col: any) => {
      //   const colId =  col.id;
      //   // const foo: any = state.columnEntities[colId];
      //   state.columnEntities = {
      //     ...state.columnEntities, 
      //     [col.id]: {
      //       ...state.columnEntities[colId],
      //       ...col.changes
      //     }
      //   }
      // });

      // updatedColumns.forEach((updatedColumn: any) => {
      //   const updatedColumnId =  updatedColumn.id;
      //   const updatedColumnChanges = updatedColumn.changes || {};
      //   const index = state.columns.findIndex((stateColumn) => stateColumn.id === updatedColumnId);
      //   state.columns[index] = {...state.columns[index], ...updatedColumnChanges}
      //   state.columnEntities = {
      //     ...state.columnEntities, 
      //     [updatedColumn]: {
      //       ...state.columnEntities[updatedColumn],
      //       ...updatedColumnChanges
      //     }
      //   }
      // })

    },
    updateForm(state, action) {
        // formDetailsAdapter.updateOne(state, action.payload)
    },
    selectField(state, action) {
      state.selectedField = action.payload;
    },

    updateFieldDetails(state, action) {

      const {id, field, value} = action.payload;
      // const data = {
      //   id,
      //   changes:  {...state.columnEntities[id], [field]: value}
      // }
      console.log('action.payload', action.payload)
    
      state.columnEntities = {...state.columnEntities, [id]: value};
    },


    incrementRowColCount(state, action) {
      // const rowId = action.payload
      // const row = state.rowEntities[rowId];
      // state.rowEntities = {
      //   ...state.rowEntities, 
      //   [rowId]: {...state.rowEntities[rowId], colCount: row.colCount + 1 } 
      // };
      const index = action.payload
      state.rows[index] = {...state.rows[index], colCount: state.rows[index].colCount + 1 };

    },
    decrementRowColCount(state, action) {
      // const rowId = action.payload
      // state.rowEntities = {
      //   ...state.rowEntities, 
      //   [rowId]: {...state.rowEntities[rowId], colCount: state.rowEntities[rowId].colCount - 1 } 
      // };

      const index = action.payload
      state.rows[index] = {...state.rows[index], colCount: state.rows[index].colCount - 1 };
    },

    // incrementRowColCount, decrementRowColCount

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
  updateFieldDetails,
  incrementRowColCount,
  decrementRowColCount
} = slice.actions;
