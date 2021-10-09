import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import formServices from "src/services/formServices";

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


  export const addForm = createAsyncThunk(
    'formDetails/addForm',
    async (data: any, thunkAPI) => {
      const {formDetails} = data;
      const response = await formServices.createForm(formDetails);
      console.log('response', response);
      return response.data
    }
  )

  export const fetchFormData = createAsyncThunk(
    'formDetails/fetchFormData',
    async (formId, thunkAPI) => {
      const response = await formServices.getSingleForm(formId);
      console.log('response', response);
      return response
    }
  )
  
  
  

// export const fetchFormData = createAsyncThunk('formDetails/fetchFormData', async () => {
//   const response =  {
//     id: 'form1',
//     user_id: '1',
//     name: 'My Test Form',
//     rows: [
//       {
//         id: 'row0',
//         position: 0,
//         formId: 'form1',
//         columns: ['col0'],
//         colCount: 1,
//       },
//     ],
//     columns: [
//       {
//         id: 'col0',
//         rowId: 'row0',
//         formId: 'form1',
//         position: 0,
//         //Field info
//         name: '',
//         label:  'first Name',
//         type: 'text',
//       },
//     ]
//   }
//   return response

// });

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
      rows: [] as Array<any>,

      // TODO - Remove when can
      columns: [] as Array<any>,
      // columnEntities: {} as any,
      // rowEntities: {}  as any,
  },
  reducers: {
    addField(state, action) {
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

      state.columns = [...state.columns, action.payload.column];


    },
    addRow(state, action) {

      const newRow = {
        id: action.payload.id ,
        position: action.payload.indexToAdd,
        formId: 'form1',
        columns: [],
        colCount: 1,
      }

      const rowsCopy = [...state.rows]
      console.log(rowsCopy)
      rowsCopy.splice(action.payload.indexToAdd, 0, newRow)
        const updatedRows = rowsCopy.map((row, index) => ({
          ...row,
          position: index
        }));


      console.log('action.payload', action.payload)
      console.log('updatedRows', updatedRows)

      state.rows = updatedRows;
    },
    moveRow(state, action) {
      console.log('action.payload', action.payload)
      state.rows = action.payload;
      // action.payload.updatedColumns.forEach((updatedColumn: any) => {
      //   console.log('updatedColumn', updatedColumn)
      //   const updatedColumnId =  updatedColumn.id;
        
      //   const updatedColumnChanges = updatedColumn.changes || {};
      //   const index = state.columns.findIndex((stateColumn) => stateColumn.id === updatedColumnId);
      //   state.columns[index] = {...state.columns[index], ...updatedColumnChanges}
      // })
      // const rowEntities = arrayToObject(action.payload);
      // state.rowEntities = rowEntities;


      // action.payload.forEach((row: any) => {
      //   row.columns.forEach((colId: string) => {
      //     const index = state.columns.findIndex((stateColumn) => stateColumn.id === colId);
      //     state.columnEntities[colId] = {...state.columnEntities[colId], row: row.position}
      //     state.columns[index] = {...state.columns[index], row: row.position}
      //   });
      // });
      // rowsAdapter.setAll(state,  action.payload)
    },

    clearEmptyRows(state){
      const foo = state.rows.filter((row, index) => {
        console.log('ROW', row.columns.length)
        return row.columns.length
      })
      .map((row, index) => {
        //  const columns = row.columns.map((col: any) => ({...col, rowPosition: index}))
         return {
           ...row,
          // columns,
          position: index,
         }
       })
       
       state.rows = foo
    },

    moveCol(state, action) {
      const rowId = action.payload.updatedRow.id
      console.log('action.payload.updatedRow', action.payload.updatedRow)
      // const updatedRowEntities: any =  {...state.rowEntities, [rowId]: action.payload.updatedRow}
      // const updatedRowArray = Object.keys(updatedRowEntities).map((k) => updatedRowEntities[k])
      const rowIndex = action.payload.rowIndex;
      const { rows } = state;
      const colIndex = 0
      // state.rows = action.payload.updatedRow;
      const updatedRows = [...rows].map((row, index) => {
        if (row.id === rowId) {
          return action.payload.updatedRow
        }
        return row
      })
      const foo = updatedRows.filter((row, index) => {
        console.log('ROW', row.columns.length)
        return row.columns.length
      })
      .map((row, index) => {
        //  const columns = row.columns.map((col: any) => ({...col, rowPosition: index}))
         return {
           ...row,
          // columns,
          position: index,
         }
       })

    // //  const filteredRows = [...updatedRows].filter(row => row.columns.length)
    //  console.log('filteredRows', filteredRows)

    //  const final = [...filteredRows].map((row, index) => {
    //   //  const columns = row.columns.map((col: any) => ({...col, rowPosition: index}))
    //    return {
    //      ...row,
    //     // columns,
    //     position: index,
    //    }
    //  })
     state.rows = updatedRows
    //  state.columns = action.payload.updatedCols;
      // state.rows[rowIndex] = action.payload.updatedRow


      // state.columns = action.payload.updatedCols.
      // state.rowEntities = updatedRowEntities;
      // state.rows = updatedRowArray;

      // const updatedColumns =  action.payload.updatedCols;


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

      action.payload.updatedColumns.forEach((updatedColumn: any) => {
        
        const updatedColumnId =  updatedColumn.id;
        const updatedColumnChanges = updatedColumn.changes || {};
        const index = state.columns.findIndex((stateColumn) => stateColumn.id === updatedColumnId);
        state.columns[index] = {...state.columns[index], ...updatedColumnChanges}
      })

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
      const index = state.columns.findIndex(col => col.id === id)
      state.columns[index] = {...state.columns[index], label: value}
  
      // state.columnEntities = {...state.columnEntities, [id]: value};
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
    builder.addCase(fetchFormData.pending, (state) => {
      state.loading = true
    });

    builder.addCase(fetchFormData.fulfilled, (state, action) => {
      const {id, user_id, name, rows} = action.payload;

      // const columnEntities = arrayToObject(action.payload.columns);
      // const rowEntities = arrayToObject(action.payload.rows);
      state.loading = false;
      state.name = name;
      state.rows = [...state.rows, ...rows]
      state.columns = [...state.columns, ...action.payload.columns]
      // state.columnEntities = columnEntities;
      // state.rowEntities = rowEntities;
    });
    builder.addCase(fetchFormData.rejected, (state) => {
      state.loading = false;
    });

  }
});

const reducer = slice.reducer;
export default reducer;
export const { 
  addField, 
  moveCol,
  clearEmptyRows,
  moveRow,
  addRow,
  selectField,
  updateFieldDetails,
  incrementRowColCount,
  decrementRowColCount
} = slice.actions;
