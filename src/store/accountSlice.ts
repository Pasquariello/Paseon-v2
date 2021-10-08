import { createSlice, createEntityAdapter, createAsyncThunk, EntityState, EntityId } from "@reduxjs/toolkit";
// import { fetchForm } from "../articles/articlesSlice";
import authService from 'src/services/authService';

import { RootState } from '.';

export interface AccountData {
    id: string,
    email: string,
    firstName: string,
    lastName:string,
  }

const accountAdapter = createEntityAdapter<AccountData>();

export const login = createAsyncThunk('account/fetchForms', async(data: {email: string, password: string}) => {

    const response  = await authService.loginWithEmailAndPassword({email: data.email, password: data.password});
    console.log('response', response)
    return {
        user: response?.data?.user || {},
        auth: response?.status === 200 || false,
    }
});



export const slice = createSlice({
  name: "account",
  initialState:  accountAdapter.getInitialState({
    auth: false,
    errorMessage: '',
    loading: false,
  }),
  reducers: {
    setUserData(state, action) {
      console.log('ACTION.PAYLOAD', action)
      state.auth = action.payload.auth
    }
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      accountAdapter.setAll(state, action.payload.user);
      state.auth = action.payload.auth
      state.loading = false;
    });
    builder.addCase(login.rejected, (state) => {
      state.loading = false;
    });
  }
});

const reducer = slice.reducer;
export default reducer;
export const { setUserData } = slice.actions;
