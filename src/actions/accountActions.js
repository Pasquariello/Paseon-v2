// import axios from 'src/utils/axios';
import authService from 'src/services/authService';
// export const LOGIN_REQUEST = '@account/login-request';
export const LOGIN_SUCCESS = '@account/login-success';
export const LOGIN_FAILURE = '@account/login-failure';
export const SILENT_LOGIN = '@account/silent-login';
export const LOGOUT = '@account/logout';
export const REGISTER = '@account/register';
export const UPDATE_PROFILE = '@account/update-profile';
export const USER_REQUEST = '@account/login-request';
export const USER_LOADED = '@account/login-request';
export const AUTH_ERROR = '@account/login-request';
export const CREATE_ACCOUNT = '@account/create-account-request';
export const CREATE_ACCOUNT_FAILED = '@account/create-account-request-failed';
export const CLEAR_ERROR_MESSAGE = '@account/clear-error-message';


// export function loadUser() {
//   return async (dispatch) => {
//     try {
//       const user = await authService.getLoggedInUser();
//       dispatch({
//         type: USER_LOADED,
//         payload: {
//           user
//         }
//       });
//     } catch (error) {
//       dispatch({ type: AUTH_ERROR });
//       throw error;
//     }
//   };
// }


export function login(email, password) {
  return async (dispatch) => {
    try {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          auth: true
        }
      });
      //dispatch(loadUser());
    } catch (error) {
     // dispatch({ type: LOGIN_FAILURE });
      throw error;
    }
  };
}

export function createAccount(accoutData) {
  return async (dispatch) => {
    try {
      console.log('hi')
      const data = await authService.createAccount(accoutData); 
      dispatch({
        type: CREATE_ACCOUNT,
        payload: data.body
      });
    } catch (error) {
      console.log('ERRRRR', error.response)
      dispatch({
        type: CREATE_ACCOUNT_FAILED,
        payload: error.response.data.message || 'Failed'
      });
    }
  };
}


export function clearAccountErrorMessage() {
  return async (dispatch) => {
      console.log('HELLO')
      dispatch({
        type: CLEAR_ERROR_MESSAGE,
      });
  };
}
// export function setUserData(user, auth) {
//   return (dispatch) => dispatch({
//     type: SILENT_LOGIN,
//     payload: {
//       user,
//       auth,
//     }
//   });
// }
// export function logout() {
//   return async (dispatch) => {
//     authService.logout();
//     dispatch({
//       type: LOGOUT
//     });
//   };
// }
// export function register() {
//   return true;
// }
// export function updateProfile(update) {
//   const request = axios.post('/api/account/profile', { update });
//   return (dispatch) => {
//     request.then((response) => dispatch({
//       type: UPDATE_PROFILE,
//       payload: response.data
//     }));
//   };
// }