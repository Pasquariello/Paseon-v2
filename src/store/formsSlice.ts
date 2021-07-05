import { createSlice, createEntityAdapter, createAsyncThunk, EntityState, EntityId } from "@reduxjs/toolkit";
// import { fetchForm } from "../articles/articlesSlice";
import { RootState } from '.';
import {Row} from './rowsSlice';
import formsService from 'src/services/formServices';


interface FormData {
    id: string;
    user_id: string;
    // title: string;
    name: string;
    fields: Array<Object>
    // rows: Array<String>,
    // columns: Array<Object>,
  }

const formsAdapter = createEntityAdapter<FormData>();

export const fetchForms = createAsyncThunk('forms/fetchForms', async () => {
  const response = await formsService.getForms(); 
  return (await response) as FormData[];
});

export const slice = createSlice({
  name: "forms",
  initialState:  formsAdapter.getInitialState({
      activeForm: '',
      selectedField: '',
      loading: false,
  }),
  reducers: {
    addField(state, action) {
        if (!state.activeForm){
            state.activeForm = action.payload.id
            formsAdapter.addOne(state, action.payload)
        }
        else {
          const id = action.payload.id;
          const data = {
            id,
            changes:  {...state.entities[id], rows: action.payload.rows}
          }
          formsAdapter.updateOne(state, data)
        }
        console.log('action.payload', action.payload)
    },

    updateForm(state, action) {
        // formsAdapter.updateOne(state, action.payload)
    },
    selectField(state, action) {
      state.selectedField = action.payload;
  },
  },
  extraReducers:(builder) => {
    builder.addCase(fetchForms.pending, (state) => {
      console.log('pending')

      state.loading = true;
    });
    builder.addCase(fetchForms.fulfilled, (state, action) => {
      formsAdapter.setAll(state, action.payload);
      state.loading = false;
    });
    builder.addCase(fetchForms.rejected, (state) => {
      console.log('rejected')

      state.loading = false;
    });

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
