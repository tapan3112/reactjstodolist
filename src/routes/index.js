import React from 'react'
import { Switch, Redirect } from 'react-router-dom'
import PrivateRoutes from './PrivateRoutes'
import PublicRoutes from './PublicRoutes'
import { hot } from 'react-hot-loader'
import Home from '../views/Home/index'
import Login from '../views/Auth/login'
import Signup from '../views/Auth/signup'

const Routes = () => (
  <Switch>
    <PublicRoutes
      path="/"
      component={Login}
      exact={true}
    />
    <PublicRoutes
      path="/login"
      component={Login}
      exact={true}
    />
    <PublicRoutes
      path="/signup"
      component={Signup}
      exact={true}
    />
    <PrivateRoutes
      path="/home"
      component={Home}
      exact={true}
    />
    <Redirect to="/" />
  </Switch>
)

export default hot(module)(Routes)
