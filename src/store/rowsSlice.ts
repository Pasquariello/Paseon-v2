import { createSlice, createEntityAdapter, EntityState, EntityId } from "@reduxjs/toolkit";
// import { fetchForm } from "../articles/articlesSlice";
import { addField, 
  fetchFormData
  // updateForm
} from "./formsSlice";

import { RootState } from '.';
import {Column} from './columnsSlice';

export interface Row {
    id: string;
    position: number;
    formId: EntityId;
    columns: Array<Column>,
    // columns: Array<EntityState<Column>>,
    // columns: Array<string>,
        // columns: Array<string>,


  }

const rowsAdapter = createEntityAdapter<Row>();


export const slice = createSlice({
  name: "rows",
  initialState:  rowsAdapter.getInitialState({
    loading: false
  }),
  reducers: {
    addNewField(state, action) {
        rowsAdapter.addOne(state, action.payload);
    },
    moveCol(state, action) {
        rowsAdapter.setAll(state, action.payload.updatedRows);
        // Do I need this!? 
        // rowsAdapter.updateMany(state, action.payload.updatedRowsNew);

    }, 
    moveRow(state, action) {
      rowsAdapter.setAll(state,  action.payload)
    },
    addRow(state, action) {
      rowsAdapter.addOne(state,  action.payload)
    }
  },
  extraReducers: (builder) => {
    builder.addCase(addField, (state, action) => {
        rowsAdapter.addOne(state, action.payload.row)
    });

    builder.addCase(fetchFormData.fulfilled, (state, action) => {
      const rows = action.payload.rows.sort((a, b) => (a.position > b.position) ? 1 : -1);  
      rowsAdapter.setAll(state, rows);
      // state.loading = false;

    });
  }
});


export const { addNewField, moveCol, moveRow, addRow } = slice.actions;
export const {
  selectById: selectRowById,
  selectIds: selectRowIds,
  selectEntities: selectRowEntities,
  selectAll: selectAllRows,
  selectTotal: selectTotalRows
} = rowsAdapter.getSelectors((state: RootState) => state.rows);
export default slice.reducer;
