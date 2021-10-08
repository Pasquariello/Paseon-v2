// import { applyMiddleware, createStore, compose } from 'redux';
// import thunkMiddleware from 'redux-thunk';
// import { composeWithDevTools } from 'redux-devtools-extension';
// import rootReducer from 'src/reducers';

// export function configureStore(preloadedState = {}) {
//   const middlewares = [thunkMiddleware];

//   const middlewareEnhancer = composeWithDevTools(
//     applyMiddleware(...middlewares)
//   );
//   const enhancers = [middlewareEnhancer];
//   const composedEnhancers = compose(...enhancers);
//   const store = createStore(rootReducer, preloadedState, composedEnhancers);
//   return store;
// }

import { configureStore } from '@reduxjs/toolkit';
import formReducer from './formsSlice';
import accountReduxer from './accountSlice';
import formDetailsReducer from './formDetailsSlice';

import submissions from 'src/reducers/submissionReducer';

export const store = configureStore({
  reducer: {
    account: accountReduxer,
    forms: formReducer,
    formDetails: formDetailsReducer,
    submissions: submissions,
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;