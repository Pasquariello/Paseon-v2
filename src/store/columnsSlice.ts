import { createSlice, createEntityAdapter, EntityId} from "@reduxjs/toolkit";
import Column from "src/views/formBuilderView/formBuilder/Column";
import Row from "src/views/formBuilderView/formBuilder/Row";
// import { fetchForm } from "../articles/articlesSlice";
import { RootState } from '.';
import { 
  addField,
  fetchFormData,
  //  updateForm
  } from "./formsSlice";
  
  import { 
    moveCol,
    //  updateForm
  } from "./rowsSlice";


export interface Column {
    id: string;
    name: string;
    label: string,
    type: string,
    formId: EntityId;
    // rowId: EntityId;
    position: number;
  }

const columnsAdapter = createEntityAdapter<Column>();


export const slice = createSlice({
  name: "columns",
  initialState:  columnsAdapter.getInitialState({
    selectedColumn: {},
  }),
  reducers: {
    selectColumn(state, action){
      const id = action.payload;
      console.log('state', state.entities[id])
      state.selectedColumn = state.entities[id] || {}
    },
    updateFieldDetails(state, action) {

      const {id, field, value} = action.payload;
      const data = {
        id,
        changes:  {...state.entities[id], [field]: value}
      }
      console.log('data', data)
      columnsAdapter.updateOne(state, data);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addField, (state, action) => {
        columnsAdapter.addOne(state, action.payload.column)  
    });
    builder.addCase(moveCol, (state, action) => {
      // if (action.payload.newColumn){
      //   columnsAdapter.addOne(state, 
      //     action.payload.newColumn
      //   )
      // } else {
        columnsAdapter.upsertMany(state, 
          action.payload.newTest
        )
        // columnsAdapter.updateMany(state, 
        //   action.payload.newTest
        // )
      // }
  
    });

    builder.addCase(fetchFormData.fulfilled, (state, action) => {
      console.log('col action.payload', action.payload)
      // const cols = action.payload.columns.sort((a, b) => (a.position > b.position) ? 1 : -1);
      // IF NEED TO FLATTEN ALL COLS
      // const cols = action.payload.rows
      //   .map(row => row.columns.sort((a, b) => (a.position > b.position) ? 1 : -1)
      //   )
      //   .reduce(
      //     (arr, elem) => arr.concat(elem), []
      //   )
      //same as above just no sort
      // since  columns are build by looping through row we dont need to worry about sorting here
        const cols = action.payload.rows
        .map(row => row.columns)
        .reduce(
          (arr, elem) => arr.concat(elem), []
        )
      
      console.log('ADDED COL', cols)
      columnsAdapter.setAll(state, cols);
      // state.loading = false;

    });
  }
});

const reducer = slice.reducer;
export default reducer;
export const { updateFieldDetails, selectColumn } = slice.actions;

export const {
  selectById: selectColumnById,
  selectIds: selectColumnIds,
  selectEntities: selectColumnEntities,
  selectAll: selectAllColumns,
  selectTotal: selectTotalColumns
} = columnsAdapter.getSelectors((state: RootState) => state.columns);
