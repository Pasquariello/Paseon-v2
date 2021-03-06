import React, {
    useEffect,
    useState
  } from 'react';
  import { useDispatch } from 'react-redux';
  import PropTypes from 'prop-types';
  // import SplashScreen from 'src/components/SplashScreen';
  import LoadingScreen from 'src/components/LoadingScreen';
  
  import { 
    setUserData, 
    logout 
  } from 'src/actions/accountActions';
  import authService from 'src/services/authService';

  function Auth({ children }) {
    const dispatch = useDispatch();
    const [isLoading, setLoading] = useState(true);
    
    useEffect(() => {
      const initAuth = async () => {
        // authService.setAxiosInterceptors({
        //    onLogout: () => dispatch(logout())
        // });
        // checks for token
        if (authService.isAuthenticated()) {
          const user = await authService.loginWithToken();
          const auth = user.status === 200 || false
          await dispatch(setUserData(user.data, auth));
        }
        setLoading(false);
      };
      initAuth();
    }, [dispatch]);

    if (isLoading) {
      return <LoadingScreen />
    }
    return <div>{children}</div>;
  }
  Auth.propTypes = {
    children: PropTypes.any
  };
  export default Auth;