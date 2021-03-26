import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import FormHelperText from '@material-ui/core/FormHelperText';
import Box from '@material-ui/core/Box';
import { useSelector } from 'react-redux';

import { useHistory } from 'react-router-dom';


// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

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
            console.log('HIoo')

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
                <AccountCircleIcon />
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