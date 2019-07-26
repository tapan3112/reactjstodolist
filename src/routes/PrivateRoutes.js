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
<<<<<<< HEAD
<<<<<<< HEAD
          <Redirect to="/login" />
=======
          <Redirect to="/auth" />
>>>>>>> f2c147d6023e259d7b4a91ddafc2f69231ec652a
=======
          <Redirect to="/auth" />
>>>>>>> c39da907226494e5999be1745e2494f1ba3d1349
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