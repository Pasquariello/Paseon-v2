import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import LoadingScreen from 'src/components/LoadingScreen';

function AuthGuard({ children }) {
  const account = useSelector((state) => state.account);

  if (!account.auth) {
    return <Redirect to="/login" />;
  }
  
  return <div>{children}</div>
}
AuthGuard.propTypes = {
  children: PropTypes.any
};
export default AuthGuard;