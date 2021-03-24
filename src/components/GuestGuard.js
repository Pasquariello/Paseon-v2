import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
function GuestGuard({ children }) {
  const account = useSelector((state) => state.account);
  
  // if (account.auth) {
  //   return <Redirect to="/app/dashboard" />;
  // }
  return <div>{children}</div>;
}
GuestGuard.propTypes = {
  children: PropTypes.any
};
export default GuestGuard;