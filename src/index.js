// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import * as serviceWorker from './serviceWorker';

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();



// import 'react-app-polyfill/ie11';
// import 'react-app-polyfill/stable';
// import 'react-perfect-scrollbar/dist/css/styles.css';
// import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
// import 'react-quill/dist/quill.snow.css';
import 'nprogress/nprogress.css';
// import 'src/assets/css/prism.css';
// import 'src/mixins/chartjs';
// import 'src/mixins/prismjs';
// import 'src/mock';
// import { enableES5 } from 'immer';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import * as serviceWorker from 'src/serviceWorker';
import { configureStore } from 'src/store';
// import { restoreSettings } from 'src/utils/settings';
import App from 'src/App';
// enableES5();
const store = configureStore();
ReactDOM.render(
  <Provider store={store}>
      <App />
  </Provider>,
  document.getElementById('root')
);
serviceWorker.unregister();