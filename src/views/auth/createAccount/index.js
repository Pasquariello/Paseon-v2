import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import FormHelperText from '@mui/material/FormHelperText';
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';

import { useHistory } from 'react-router-dom';


// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import Typography from '@mui/material/Typography';
import makeStyles from '@mui/styles/makeStyles';
import Container from '@mui/material/Container';

import { useDispatch } from 'react-redux';
// import { Link as RouterLink } from 'react-router-dom';

import PropTypes from 'prop-types';
import { createAccount, clearAccountErrorMessage } from 'src/actions/accountActions';

//TODO - break out 
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Paseon
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function CreateForm() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory()

  const { errorMessage, user } = useSelector((state) => state.account);

  const [ email, setEmail ] = useState({
      value: '',
      isValid: true,
      validationError: '',
  });
  const [ passwordOne, setPasswordOne ] = useState({
    value: '',
    isValid: true,
    validationError: '',
  });
  const [ passwordTwo, setPasswordTwo ] = useState({
    value: '',
    isValid: true,
    validationError: '',
  });

  const [ firstName, setFirstName ] = useState({
    value: '',
    isValid: true,
    validationError: '',
  });

  const [ lastName, setLastName ] = useState({
    value: '',
    isValid: true,
    validationError: '',
  });

  useEffect(() => {
    dispatch(clearAccountErrorMessage());
  }, [email.value, passwordOne.value, passwordTwo.value, firstName.value, lastName.value]);

  // useEffect(() => {
  //   if (user && user.id){
  //       history.push('/app/dashboard')
  //   }
  // }, [user]);


  const [ isAccountValid, setIsAccountValid ] = useState(true);

    const validatePassword = () => {

        if (passwordOne.value !== passwordTwo.value) {
            setPasswordTwo({
                ...passwordTwo,
                isValid: false,
                validationError: 'Passwords must match',
            });
            return false;
        }     
        return true;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const isFormValid = validatePassword();
        
        if (isFormValid) {
            // console.log('HIoo')

            dispatch(createAccount({
                email: email.value,
                password: passwordOne.value,
                firstName: firstName.value,
                lastName: lastName.value,
            }));
        }
    }


  return (
    <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
            <Avatar className={classes.avatar}>
                {/* <AccountCircleIcon /> */}
            </Avatar>
            <Typography component="h1" variant="h5">
                Create Account
            </Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    error={!email.isValid}
                    helperText={!email.isValid ? email.validationError : ''}
                    id="email"
                    label="Email Address"
                    name="email"
                    type="email"
                    value={email.value}
                    onChange={(e) => setEmail({value: e.target.value, isValid: true, validationError: ''})}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    error={!firstName.isValid}
                    helperText={!firstName.isValid ? firstName.validationError : ''}
                    id="firstName"
                    label="First Name"
                    name="firstName"
                    type="text"
                    value={firstName.value}
                    onChange={(e) => setFirstName({value: e.target.value, isValid: true, validationError: ''})}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    error={!lastName.isValid}
                    helperText={!lastName.isValid ? lastName.validationError : ''}
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    type="text"
                    value={lastName.value}
                    onChange={(e) => setLastName({value: e.target.value, isValid: true, validationError: ''})}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    error={!passwordOne.isValid}
                    helperText={!passwordOne.isValid ? passwordOne.validationError : ''}
                    name="passwordOne"
                    label="Password"
                    type="password"
                    id="passwordOne"
                    value={passwordOne.value}
                    onChange={(e) => setPasswordOne({value: e.target.value, isValid: true, validationError: ''})}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    error={!passwordTwo.isValid}
                    helperText={!passwordTwo.isValid ? passwordTwo.validationError : ''}
                    name="passwordTwo"
                    label="Confirm Password"
                    type="password"
                    id="passwordTwo"
                    value={passwordTwo.value}
                    onChange={(e) => setPasswordTwo({value: e.target.value, isValid: true, validationError: ''})}
                />

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                Create
                </Button>
                {errorMessage ?   <FormHelperText error>{errorMessage}</FormHelperText> : ''}
            </form>
        </div>
        <Box mt={8}>
            <Copyright />
        </Box>
    </Container>
  );
}

CreateForm.propTypes = {
  className: PropTypes.string,
  onSubmitSuccess: PropTypes.func
};
CreateForm.defaultProps = {
  onSubmitSuccess: () => {}
};
export default CreateForm;