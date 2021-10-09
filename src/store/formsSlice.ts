import { createSlice, createEntityAdapter, createAsyncThunk, EntityState, EntityId } from "@reduxjs/toolkit";
// import { fetchForm } from "../articles/articlesSlice";
import { RootState } from '.';
import formServices from 'src/services/formServices';

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
  const response = await formServices.getForms(); 
  console.log('response', response)
  // const formStructure = buildArrayMatrix(response[0].fields);
  return (await response) as FormData[];
});

export const deleteOneForm = createAsyncThunk(
  'formDetails/deleteForm',
  async (formId: string, thunkAPI) => {
    await formServices.deleteForm(formId);
    return formId;
  }
)


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

    // start deleteForm
    builder.addCase(deleteOneForm.pending, (state) => {
      state.loading = true
    });

    builder.addCase(deleteOneForm.fulfilled, (state, action) => {
      const id = action.payload;
      state.loading = false;
      formsAdapter.removeOne(state, id);
    });
    builder.addCase(deleteOneForm.rejected, (state) => {
      state.loading = false;
    });
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
