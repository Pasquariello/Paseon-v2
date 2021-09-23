import React from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
// import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import Auth from 'src/components/Auth';
import Routes from 'src/Routes';
const history = createBrowserHistory();
const useStyles = makeStyles(() => createStyles({
  '@global': {
    '*': {
      boxSizing: 'border-box',
      margin: 0,
      padding: 0,
    },
    html: {
      '-webkit-font-smoothing': 'antialiased',
      '-moz-osx-font-smoothing': 'grayscale',
      height: '100%',
      width: '100%'
    },
    body: {
      height: '100%',
      width: '100%',
    },
    '#root': {
      height: '100%',
      width: '100%',

    }
  }
}));

function App() {
  useStyles();
  return (
    <Router history={history}>
      <Auth>
        <Routes />
      </Auth>
    </Router>
  );
}
export default App;

