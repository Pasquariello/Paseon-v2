import { createSlice, createEntityAdapter, createAsyncThunk, EntityState, EntityId } from "@reduxjs/toolkit";
// import { fetchForm } from "../articles/articlesSlice";
import { RootState } from '.';
import {Row} from './rowsSlice';
import formsService from 'src/services/formServices';

import {buildArrayMatrix} from 'src/views/formBuilderView/formBuilder/formBuilderUtilities.js';
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
  const formStructure = buildArrayMatrix(response[0].fields);
  console.log('formStructure', formStructure)
  return (await response) as FormData[];
});

export const fetchFormData = createAsyncThunk('forms/fetchFormData', async () => {
  const response =  {
    id: 'form1',
    user_id: '1',
    name: 'My Test Form',
    rows: [
      {
        id: 'row1',
        position: 1,
        formId: 'form1',
        columns: [
          {
            id: 'col1',
            name: '',
            label:  'first Name',
            type: 'text',
            formId: 'form1',
            rowId: '',
            position: 1,
          },
          {
            id: 'col2',
            name: '',
            label:  'first Name',
            type: 'text',
            formId: 'form1',
            rowId: '',
            position: 2,
          }
        ],
      },
      {
        id: 'row0',
        position: 0,
        formId: 'form1',
        columns: [{
          id: 'col0',
          name: '',
          label:  'first Name',
          type: 'text',
          formId: 'form1',
          rowId: '',
          position: 0,
        },
        {
          id: 'col3',
          name: '',
          label:  'first Name',
          type: 'text',
          formId: 'form1',
          rowId: '',
          position: 3,
        },],
      },
    ],
    // columns: [
    //   {
    //     id: 'col0',
    //     name: '',
    //     label:  'first Name',
    //     type: '',
    //     formId: 'form1',
    //     // rowId: '',
    //     position: 0,
    //   },
    //   {
    //     id: 'col3',
    //     name: '',
    //     label:  'first Name',
    //     type: '',
    //     formId: 'form1',
    //     // rowId: '',
    //     position: 3,
    //   },
    //   {
    //     id: 'col1',
    //     name: '',
    //     label:  'first Name',
    //     type: '',
    //     formId: 'form1',
    //     // rowId: '',
    //     position: 1,
    //   },
    //     {
    //       id: 'col2',
    //       name: '',
    //       label:  'first Name',
    //       type: '',
    //       formId: 'form1',
    //       // rowId: '',
    //       position: 2,
    //     }
    //   ],
  }
  return response

});


export const slice = createSlice({
  name: "forms",
  initialState:  formsAdapter.getInitialState({
      activeForm: '',
      selectedField: '',
      status: formReqState.DEFUALT,
      loading: false,
  }),
  reducers: {
    addField(state, action) {
        if (!state.activeForm){
          console.log(' action.payload', action.payload)
            state.activeForm = action.payload.id

            const { row, column, ...formData } = action.payload;
            formsAdapter.addOne(state, formData)
        }
        else {
          const id = action.payload.id;
          const data = {
            id,
            changes:  {...state.entities[id], rows: action.payload.rows}
          }
          formsAdapter.updateOne(state, data)
        }
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

    builder.addCase(fetchFormData.fulfilled, (state, action) => {
      const {id, user_id, name, rows } = action.payload;
      const form = {
        id, 
        user_id, 
        name, 
        rows: rows.map(row => row.id)
      }
      state.loading = false;
      formsAdapter.addOne(state, form)
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
