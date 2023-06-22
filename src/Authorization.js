import React from 'react';
import { Redirect } from 'react-router-dom';

const withAuthorization = (WrappedComponent) => {
  const AuthenticatedComponent = (props) => {
    const isAuthenticated = localStorage.getItem('token');
    // Check if user is authenticated
    if (isAuthenticated) {
      return <WrappedComponent {...props} />;
    } else {
      // Redirect to login page if user is not authenticated
      return <Redirect to="/" />;
    }
  };
  return AuthenticatedComponent;
};

export default withAuthorization;