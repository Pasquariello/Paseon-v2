import { createSlice, createEntityAdapter, EntityState, EntityId } from "@reduxjs/toolkit";
// import { fetchForm } from "../articles/articlesSlice";
import { addField, 
  // updateForm
} from "./formsSlice";

import { RootState } from '.';
import {Column} from './columnsSlice';

export interface Row {
    id: string;
    position: number;
    formId: EntityId;
    columns: Array<EntityState<Column>>,
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
    }, 
    moveRow(state, action) {
      console.log(' action.payload.row',  action.payload)
      rowsAdapter.setAll(state,  action.payload)
    }
  },
  extraReducers: (builder) => {
    builder.addCase(addField, (state, action) => {
        console.log(' action.payload.row',  action.payload.row)
        rowsAdapter.addOne(state, action.payload.row)
    });
  }
});


export const { addNewField, moveCol, moveRow } = slice.actions;
export const {
  selectById: selectRowById,
  selectIds: selectRowIds,
  selectEntities: selectRowEntities,
  selectAll: selectAllRows,
  selectTotal: selectTotalRows
} = rowsAdapter.getSelectors((state: RootState) => state.rows);
export default slice.reducer;
