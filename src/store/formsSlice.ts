import { createSlice, createEntityAdapter, createAsyncThunk, EntityState, EntityId } from "@reduxjs/toolkit";
// import { fetchForm } from "../articles/articlesSlice";
import { RootState } from '.';
import formsService from 'src/services/formServices';

// import {buildArrayMatrix} from 'src/views/formBuilderView/formBuilder/formBuilderUtilities.js';
interface FormData {
    id: string;
    user_id: string;
    name: string;
    rows: Array<String>,
    // fields: Array<Object>
    // columns: Array<Object>,
  }

  enum formReqState {
    DEFUALT,
    LOADING,
    SUCCESS,
    ERROR
  }

const formsAdapter = createEntityAdapter<FormData>();

export const fetchForms = createAsyncThunk('forms/fetchForms', async () => {
  const response = await formsService.getForms(); 
  console.log('response', response)
  // const formStructure = buildArrayMatrix(response[0].fields);
  return (await response) as FormData[];
});


export const slice = createSlice({
  name: "forms",
  initialState:  formsAdapter.getInitialState({
      activeForm: '',
      selectedField: '',
      status: formReqState.DEFUALT,
      loading: false,
  }),
  reducers: {},
  extraReducers:(builder) => {
    // start fetchForms
    builder.addCase(fetchForms.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchForms.fulfilled, (state, action) => {
      console.log('fullfulled', action.payload)
      formsAdapter.setAll(state, action.payload);
      state.loading = false;
    });
    builder.addCase(fetchForms.rejected, (state) => {
      state.loading = false;
    });
    // end fetchForms
  }
});

const reducer = slice.reducer;
export default reducer;
// export const {} = slice.actions;

export const {
  selectById: selectFormById,
  selectIds: selectFormIds,
  selectEntities: selectFormEntities,
  selectAll: selectAllForms,
  selectTotal: selectTotalForms
} = formsAdapter.getSelectors((state: RootState) => state.forms);
