import { createSlice, createEntityAdapter, EntityId} from "@reduxjs/toolkit";
// import { fetchForm } from "../articles/articlesSlice";
import { RootState } from '.';
import { 
  addField,
  //  updateForm
  } from "./formsSlice";


export interface Column {
    id: number;
    name: string;
    label: string,
    type: string,
    formId: EntityId;
    rowId: EntityId;
    position: number;
  }

const columnsAdapter = createEntityAdapter<Column>();


export const slice = createSlice({
  name: "columns",
  initialState:  columnsAdapter.getInitialState(),
  reducers: {
    updateFieldDetails(state, action) {

      const {id, field, value} = action.payload;
      const data = {
        id,
        changes:  {...state.entities[id], [field]: value}
      }
      columnsAdapter.updateOne(state, data);
  },




  },
  extraReducers: (builder) => {
    builder.addCase(addField, (state, action) => {
        columnsAdapter.addOne(state, action.payload.column)  
    });
  }
});

const reducer = slice.reducer;
export default reducer;
export const { updateFieldDetails } = slice.actions;

export const {
  selectById: selectColumnById,
  selectIds: selectColumnIds,
  selectEntities: selectColumnEntities,
  selectAll: selectAllColumns,
  selectTotal: selectTotalColumns
} = columnsAdapter.getSelectors((state: RootState) => state.columns);
