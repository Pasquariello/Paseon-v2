import { createSlice, createEntityAdapter, createAsyncThunk, EntityState, EntityId } from "@reduxjs/toolkit";
// import { fetchForm } from "../articles/articlesSlice";
import { RootState } from '.';
import {Row} from './rowsSlice';

interface Form {
    id: number;
    title: string;
    fields: Array<Object>
    rows: Array<String>,
    columns: Array<Object>,
  }

const formsAdapter = createEntityAdapter<Form>();

// export const addField = createAsyncThunk(
//     "forms/addField",
//     payload => {
//         return payload as Form;;
//     }
//   );

export const slice = createSlice({
  name: "forms",
  initialState:  formsAdapter.getInitialState({
      activeForm: '',
      selectedField: '',
  }),
  reducers: {
    addField(state, action) {
        if (!state.activeForm){
            state.activeForm = action.payload.id
        }
        else {
          const id = action.payload.id;
          const data = {
            id,
            changes:  {...state.entities[id], rows: action.payload.row}
          }
          // columnsAdapter.updateOne(state, data);
          formsAdapter.updateOne(state, data)
        }
        console.log('action.payload', action.payload)
        // formsAdapter.upsertOne(state, action.payload)
    },
    updateForm(state, action) {
        // formsAdapter.updateOne(state, action.payload)
    },
    selectField(state, action) {
      state.selectedField = action.payload;
  },
  },
  extraReducers:(builder) => {
    // builder.addCase(addField.fulfilled, (state, action) => {
    //     formsAdapter.addOne(state, action.payload)
    // });

  }
});

const reducer = slice.reducer;
export default reducer;
export const { 
  addField, 
  // updateForm, 
  selectField } = slice.actions;

export const {
  selectById: selectFormById,
  selectIds: selectFormIds,
  selectEntities: selectFormEntities,
  selectAll: selectAllForms,
  selectTotal: selectTotalForms
} = formsAdapter.getSelectors((state: RootState) => state.forms);
