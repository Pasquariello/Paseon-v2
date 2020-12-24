// import axios from 'src/utils/axios';
// import authService from 'src/services/authService';
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