import React, {
    useEffect,
    useState
  } from 'react';
  import { useDispatch } from 'react-redux';
  import PropTypes from 'prop-types';
//   import SplashScreen from 'src/components/SplashScreen';
//   import { setUserData, logout } from 'src/actions/accountActions';
//   import authService from 'src/services/authService';

  function Auth({ children }) {
    const dispatch = useDispatch();
    // const [isLoading, setLoading] = useState(true);
    
    // useEffect(() => {
    //   const initAuth = async () => {
    //     authService.setAxiosInterceptors({
    //       onLogout: () => dispatch(logout())
    //     });
    //     authService.handleAuthentication();
    //     // checks for token
    //     if (authService.isAuthenticated()) {
    //       const user = await authService.getLoggedInUser();
    //       // double check passing 'true' for auth works
    //       await dispatch(setUserData(user, true));
    //     }
    //     setLoading(false);
    //   };
    //   initAuth();
    // }, [dispatch]);

    // if (isLoading) {
    //   return <SplashScreen />;
    // }
    return children;
  }
  Auth.propTypes = {
    children: PropTypes.any
  };
  export default Auth;