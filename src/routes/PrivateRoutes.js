import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({
  isAuthenticated,
  component: Component,
  ...rest
}) => (
    <Route {...rest} render={(props) => (
      isAuthenticated ? (
        <div>
          <Component {...props} />
        </div>
      ) : (
          <Redirect to="/auth" />
        )
    )} />
  );

const mapStateToProps = (state, props) => {
  return ({
    // isAuthenticated: true
    isAuthenticated: !!state.auth.token
  })
};

export default connect(mapStateToProps, null, null, { pure: false })(PrivateRoute);