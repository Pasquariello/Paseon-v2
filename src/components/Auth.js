import React, {
    useEffect,
    useState
  } from 'react';
  import { useDispatch } from 'react-redux';
  import PropTypes from 'prop-types';
  // import SplashScreen from 'src/components/SplashScreen';
  import LoadingScreen from 'src/components/LoadingScreen';
  
  // import { 
  //   setUserData, 
  //   logout 
  // } from 'src/actions/accountActions';
  import {setUserData} from 'src/store/accountSlice';
  import authService from 'src/services/authService';

  function Auth({ children }) {
    const dispatch = useDispatch();
    const [isLoading, setLoading] = useState(true);
    
    useEffect(() => {
      console.log('HERE 1')

      const initAuth = async () => {
        console.log('HERE 2')
        // authService.setAxiosInterceptors({
        //    onLogout: () => dispatch(logout())
        // });
        // checks for token
        const auth = authService.isAuthenticated()
        if (auth) {
          const user = await authService.loginWithToken();
          const auth = user.status === 200 || false
          console.log('HERE 3',user.status )
          console.log('HERE 3', auth )
          await dispatch(setUserData({user: user.data, auth}));
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